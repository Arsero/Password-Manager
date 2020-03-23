import React, { useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import { IAccount } from "../../../app/models/account";

interface IProps {
  showPassword: boolean;
  accounts: IAccount[];
}

export const AccountList: React.FC<IProps> = ({ showPassword, accounts }) => {
    useEffect(() => {
        console.log(accounts);
    }, []);

  return (
    <Container style={{ paddingTop: "70px" }}>
      <Table responsive>
        <thead>
          <tr>
            <th>Website</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Comment</th>
            <th>Copy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id}>
              <td>{account.website}</td>
              <td>{account.email}</td>
              <td>{account.username}</td>
              <td>{account.password}</td>
              <td>{account.comment}</td>
              <td>Button</td>
              <td>Button</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
