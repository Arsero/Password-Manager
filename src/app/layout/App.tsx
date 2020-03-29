import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";
import { Route } from "react-router-dom";
import AccountForm from "../../features/accounts/AccountForm";
import path from "path";
import { remote } from "electron";
import fileUtils from "../../utils/FileUtils";
import { Login } from "../../features/login/Login";
import CryptUtils from "../../utils/cryptUtils";

export const App = () => {
  //initialValues.sort((a, b) => (a.website < b.website ? -1 : 1));
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(null);
  const [isLogged, setisLogged] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isRegister, setisRegister] = useState<boolean>(false);

  const pathFile = path.join(remote.app.getPath("appData"), "/accounts.txt");

  const handleCreateAccount = (account: IAccount) => {
    setAccounts([...accounts, account]);
  };

  const handleEditAccount = (account: IAccount) => {
    setAccounts([...accounts.filter(a => a.id !== account.id), account]);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts([...accounts.filter(a => a.id !== id)]);
  };

  const handleCopyPassword = (id: string) => {
    // Copy the password to the clipboard
    let pwd = accounts.find(a => a.id === id).password;
    if (pwd !== undefined) {
      navigator.clipboard.writeText(pwd);
    }
  };

  const handleSelectAccount = (id: string) => {
    setSelectedAccount(accounts.filter(a => a.id === id)[0]);
  };

  const loadAccounts = (pwd: string) => {
    try {
      let data = fileUtils.loadData(pathFile);
      const decryptedData = CryptUtils.decrypt(data, CryptUtils.hash(pwd));
      // if exception -> corrupted file or password false
      let accountsFromFile = JSON.parse(decryptedData);

      setAccounts(accountsFromFile);
      setPassword(pwd);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const registerPassword = (pwd: string) => {
    if (pwd.length > 0) {
      setPassword(pwd);
      return true;
    }
    return false;
  };

  useEffect(() => {
    // check if file exist to register
    setisRegister(fileUtils.exists(pathFile));
  }, []);

  useEffect(() => {
    if (isLogged) {
      try {
        //crypt with hashpassword
        const cryptedAccounts = CryptUtils.encrypt(
          JSON.stringify(accounts),
          CryptUtils.hash(password)
        );
        
        fileUtils.saveData(pathFile, cryptedAccounts.toString());
      } catch (error) {
        console.log(error);
      }
    }
  }, [accounts, isLogged]);

  return (
    <div>
      <NavBar isLogged={isLogged} />
      <Route
        exact
        path="/"
        render={() => (
          <Login
            checkPassword={loadAccounts}
            isRegister={isRegister}
            setisLogged={setisLogged}
            registerPassword={registerPassword}
          />
        )}
      />

      <Route
        path="/accounts"
        render={() => (
          <AccountList
            accounts={accounts}
            deleteAccount={handleDeleteAccount}
            copyPassword={handleCopyPassword}
            selectAccount={handleSelectAccount}
          />
        )}
      />

      <Route
        path={["/createAccount", "/manage/:id"]}
        render={() => (
          <AccountForm
            createAccount={handleCreateAccount}
            editAccount={handleEditAccount}
            account={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        )}
      />
    </div>
  );
};
