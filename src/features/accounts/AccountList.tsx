import React from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { IAccount } from "../../app/models/account";
import trashImage from "../../assets/images/trash.png";

interface IProps {
  showPassword: boolean;
  accounts: IAccount[];
  deleteAccount: (id: string) => void;
}

export const AccountList: React.FC<IProps> = ({
  showPassword,
  accounts,
  deleteAccount
}) => {
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
              <td>
                <Button
                    onClick={() => deleteAccount(account.id)}
                    variant="danger">
                        <Image src={trashImage}/>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
