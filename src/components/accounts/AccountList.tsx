import React from "react";
import { Container, Table, Button, Image, ButtonGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { IAccount } from "../../models/account";
import "./styles.css";
import { Trash, PencilSquare, Files } from 'react-bootstrap-icons';

interface IProps {
  accounts: IAccount[];
  deleteAccount: (id: string) => void;
  copyPassword: (id: string) => void;
  selectAccount: (id: string) => void;
}

export const AccountList: React.FC<IProps> = ({
  selectAccount,
  accounts,
  deleteAccount,
  copyPassword
}) => {
  const history = useHistory();
  const passwordStar = (lenght: number) => {
    let result= "";
    for(let i = 0; i < lenght; i++) {
      result += "*";
    }
    return result;
  }

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
            <th style={{ textAlign: "center" }}>Actions</th>
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
                <td>{ passwordStar(account.password.length)}</td>
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
                      <Files size={25} />
                    </Button>
                    <Button
                      variant="dark"
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
                      <PencilSquare size={25} />
                    </Button>
                    <Button
                      variant="danger"
                      title="Delete"
                      className="td-button"
                      onClick={() => deleteAccount(account.id)}
                    >
                      <Trash size={25} />
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
