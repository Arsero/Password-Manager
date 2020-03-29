import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";
import { Route } from "react-router-dom";
import AccountForm from "../../features/accounts/AccountForm";
import path from "path";
import { remote } from "electron";
import { saveData, loadData } from "../../utils/fileUtils";

export const App = () => {
  //initialValues.sort((a, b) => (a.website < b.website ? -1 : 1));
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(null);
  const [isloaded, setisLoaded] = useState<boolean>(false);
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

  useEffect(() => {
    if (isloaded) {
      try {
        console.log(accounts);
        //crypt with hashpassword
        saveData(pathFile, accounts);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        let data = loadData(pathFile);
        // decrypt with hashpassword
        let accountsFromFile = JSON.parse(data);
        setAccounts(accountsFromFile);
      } catch (error) {
        console.log(error);
      } finally {
        setisLoaded(true);
      }
    }
  }, [accounts]);

  return (
    <div>
      <NavBar />
      <Route
        exact
        path="/"
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
