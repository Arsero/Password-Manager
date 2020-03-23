import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";

export const App = () => {
  const initialValues: IAccount[] = [
    {
      id: "1231",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "123",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1232",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1233",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1234",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    },
    {
      id: "1235",
      website: "aaa.com",
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

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IAccount[]>(initialValues);

  const handleDeleteAccount = (id: string) => {
    setAccounts([...accounts.filter(a => a.id !== id)])
  }

  return (
    <div>
      <NavBar />
      <AccountList showPassword={showPassword} accounts={accounts} deleteAccount={handleDeleteAccount} />
    </div>
  );
};
