import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";
import { Route } from "react-router-dom";
import AccountForm from "../../features/accounts/AccountForm";
import path from "path";
import { remote } from "electron";
import fs from "fs";

export const App = () => {
  const initialValues: IAccount[] = [
    {
      id: "1231",
      website: "baaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "123",
      website: "caaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1232",
      website: "daaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1233",
      website: "eaaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1234",
      website: "faaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1235",
      website: "gaaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1236",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    }
  ];

  initialValues.sort((a, b) => (a.website < b.website ? -1 : 1));
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IAccount[]>(initialValues);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>(null);

  const savePasswords = () => {
    const pathFile = path.join(
      remote.app.getPath("appData"),
      "/password-manager/user.txt"
    );

    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    }

    var jsonData = JSON.stringify(accounts);
    fs.writeFile(pathFile, jsonData, err => {
      if (err) {
        console.log(err);
      }
    });
  };

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
    return () => {
      //savePasswords();
      console.log(accounts);
    };
  }, [accounts]);

  return (
    <div>
      <NavBar />
      <Route
        exact
        path="/"
        render={() => (
          <AccountList
            showPassword={showPassword}
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
