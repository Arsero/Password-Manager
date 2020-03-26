import React from "react";
import { Container, Table, Button, Image } from "react-bootstrap";
import { IAccount } from "../../app/models/account";
// @ts-ignore
import trashImage from "../../assets/images/trash.png";
// @ts-ignore
import copyImage from "../../assets/images/copy.png";
import "./styles.css";

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
            <th>Email address</th>
            <th>Username</th>
            <th>Password</th>
            <th>Comment</th>
            <th>Copy / Delete</th>
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
              <td>
                <Button style={{marginRight: '15px'}}
                  variant="info" title="Copy"
                  className="td-button">
                  <Image src={copyImage} />
                </Button>
                <Button
                  variant="danger" title="Delete"
                  className="td-button"
                  onClick={() => deleteAccount(account.id)}>
                  <Image src={trashImage} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
