import React from "react";
import { Container, Table, Button, Image, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IAccount } from "../../app/models/account";
// @ts-ignore
import trashImage from "../../assets/images/trash.png";
// @ts-ignore
import copyImage from "../../assets/images/copy.png";
// @ts-ignore
import editImage from "../../assets/images/edit.png";
import "./styles.css";

interface IProps {
  showPassword: boolean;
  accounts: IAccount[];
  deleteAccount: (id: string) => void;
  copyPassword: (id: string) => void;
  selectAccount: (id: string) => void;
}

export const AccountList: React.FC<IProps> = ({
  showPassword,
  selectAccount,
  accounts,
  deleteAccount,
  copyPassword
}) => {
  const history = useHistory();

  return (
    <Container style={{ marginTop: "5em" }}>
      <Table responsive>
        <thead>
          <tr>
            <th>Website</th>
            <th>Email address</th>
            <th>Username</th>
            <th>Password</th>
            <th>Comment</th>
            <th style={{ textAlign: "center" }}>Copy / Delete</th>
          </tr>
        </thead>
        <tbody>
          {accounts
            .sort((a, b) => (a.website < b.website ? -1 : 1))
            .map(account => (
              <tr key={account.id}>
                <td>{account.website}</td>
                <td>{account.email}</td>
                <td>{account.username}</td>
                <td>***********</td>
                <td>{account.comment}</td>
                <td style={{ textAlign: "center" }}>
                  <ButtonGroup>
                    <Button
                      style={{ marginRight: "15px" }}
                      variant="dark"
                      title="Copy"
                      className="td-button"
                      onClick={() => copyPassword(account.id)}
                    >
                      <Image src={copyImage} />
                    </Button>
                    <Button
                      variant="primary"
                      style={{ marginRight: "15px" }}
                      title="Edit"
                      className="td-button"
                      onClick={() => {
                        selectAccount(account.id);
                        const location = {
                          pathname: `/manage/${account.id}`
                        };
                        history.push(location);
                      }}
                    >
                      <Image src={editImage} />
                    </Button>
                    <Button
                      variant="danger"
                      title="Delete"
                      className="td-button"
                      onClick={() => deleteAccount(account.id)}
                    >
                      <Image src={trashImage} />
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};
