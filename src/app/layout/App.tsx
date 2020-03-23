import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountList } from "../../features/accounts/dashboard/AccountList";
import { NavBar } from "../../features/nav/NavBar";
import { IAccount } from "../models/account";

export const App = () => {
  const initialValues: IAccount[] = [
    {
      id: "123",
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
      id: "123",
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
      id: "123",
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
      id: "123",
      website: "aaa.com",
      email: "aaa@gmail.com",
      username: "aaauser",
      password: "aaapassword",
      comment: "cool"
    }
  ];

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [accounts, setAccounts] = useState<IAccount[]>(initialValues);

  return (
    <div>
      <NavBar />
      <AccountList showPassword={showPassword} accounts={accounts} />
    </div>
  );
};
