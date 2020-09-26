import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../components/accounts/AccountList";
import { NavBar } from "../../components/nav/NavBar";
import { IAccount } from "../../models/account";
import { Route } from "react-router-dom";
import AccountForm from "../../components/accounts/AccountForm";
import path from "path";
import { remote } from "electron";
import fileUtils from "../../utils/FileUtils";
import { Login } from "../../components/login/Login";
import CryptUtils from "../../utils/CryptUtils";

export const App = () => {
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(null);
  const [isLogged, setisLogged] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isRegister, setisRegister] = useState<boolean>(false);

  const pathFile = path.join(
    remote.app.getPath("appData"),
    "Password Manager/accounts.pwd"
  );

  console.log(pathFile);
  const handleCreateAccount = (account: IAccount) => {
    setAccounts([...accounts, account]);
  };

  const handleEditAccount = (account: IAccount) => {
    setAccounts([...accounts.filter((a) => a.id !== account.id), account]);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts([...accounts.filter((a) => a.id !== id)]);
  };

  const handleCopyPassword = (id: string) => {
    // Copy the password to the clipboard
    let pwd = accounts.find((a) => a.id === id).password;
    if (pwd !== undefined) {
      navigator.clipboard.writeText(pwd);
    }
  };

  const handleSelectAccount = (id: string) => {
    setSelectedAccount(accounts.filter((a) => a.id === id)[0]);
  };

  const updateFile = (pwd) => {
    try {
      //crypt with hashpassword
      setPassword(pwd);
      const cryptedAccounts = CryptUtils.encrypt(
        JSON.stringify(accounts),
        CryptUtils.hash(pwd)
      );

      fileUtils.saveData(pathFile, cryptedAccounts.toString());
    } catch (error) {
      console.error(error);
    }
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
      updateFile(pwd);
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
      updateFile(password);
    }
  }, [accounts, isLogged]);

  return (
    <>
      <NavBar isLogged={isLogged} setisRegister={setisRegister} />
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
    </>
  );
};
