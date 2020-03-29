import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";
import { Route } from "react-router-dom";
import AccountForm from "../../features/accounts/AccountForm";
import path from "path";
import { remote } from "electron";
import { saveData, loadData, exists } from "../../utils/fileUtils";
import { Login } from "../../features/login/Login";

export const App = () => {
  //initialValues.sort((a, b) => (a.website < b.website ? -1 : 1));
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(null);
  const [isLogged, setisLogged] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [isRegister, setisRegister] = useState<boolean>(false);

  const pathFile = path.join(remote.app.getPath("desktop"), "/accounts.txt");

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
      if (pwd === "aaa") {
        let data = loadData(pathFile);
        // decrypt with hashpassword
        let accountsFromFile = JSON.parse(data);
        setAccounts(accountsFromFile);

        setPassword(pwd);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    // check if file exist to store a password
    setisRegister(exists(pathFile));
  }, [])

  useEffect(() => {
    if (isLogged) {
      try {
        console.log(accounts);
        //crypt with hashpassword
        saveData(pathFile, accounts);
      } catch (error) {
        console.log(error);
      }
    }
  }, [accounts, isLogged]);

  return (
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <NavBar isLogged={isLogged} />
            <Login checkPassword={loadAccounts} isRegister={isRegister} setisLogged={setisLogged} />
          </div>
        )}
      />

      <Route
        path="/accounts"
        render={() => (
          <div>
            <NavBar isLogged={isLogged} />
            <AccountList
              accounts={accounts}
              deleteAccount={handleDeleteAccount}
              copyPassword={handleCopyPassword}
              selectAccount={handleSelectAccount}
            />
          </div>
        )}
      />

      <Route
        path={["/createAccount", "/manage/:id"]}
        render={() => (
          <div>
            <NavBar isLogged={isLogged} />
            <AccountForm
              createAccount={handleCreateAccount}
              editAccount={handleEditAccount}
              account={selectedAccount}
              setSelectedAccount={setSelectedAccount}
            />
          </div>
        )}
      />
    </div>
  );
};
