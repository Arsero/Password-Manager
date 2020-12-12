import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Table, Button, ButtonGroup } from 'react-bootstrap';
import { Trash, PencilSquare, Files } from 'react-bootstrap-icons';
import Account from '../../models/account';
import './styles.css';

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteAccount: (id: string) =>
      dispatch({ type: 'DEL_ACCOUNT', payload: id }),
    CopyPassword: (id: string) => dispatch({ type: 'COPY_PWD', payload: id }),
    SelectAccount: (account: Account) =>
      dispatch({ type: 'SELECT_ACCOUNT', payload: account }),
  };
};

const passwordStar = (lenght: number) => {
  let result = '';
  for (let i = 0; i < lenght; i++) {
    result += '*';
  }
  return result;
};

const AccountList = ({
  accounts,
  DeleteAccount,
  CopyPassword,
  SelectAccount,
}: any) => {
  const history = useHistory();
  return (
    <Container style={{ marginTop: '5em' }}>
      <Table responsive>
        <thead>
          <tr>
            <th>Website</th>
            <th>Email address</th>
            <th>Username</th>
            <th>Password</th>
            <th>Comment</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {accounts
            .sort((a: Account, b: Account) => (a.website < b.website ? -1 : 1))
            .map((account: Account) => (
              <tr key={account.id}>
                <td>{account.website}</td>
                <td>{account.email}</td>
                <td>{account.username}</td>
                <td>{passwordStar(8)}</td>
                <td>{account.comment}</td>
                <td style={{ textAlign: 'center' }}>
                  <ButtonGroup>
                    <Button
                      style={{ marginRight: '15px' }}
                      variant='dark'
                      title='Copy'
                      className='td-button'
                      onClick={() => CopyPassword(account.id)}
                    >
                      <Files size={25} />
                    </Button>
                    <Button
                      variant='dark'
                      style={{ marginRight: '15px' }}
                      title='Edit'
                      className='td-button'
                      onClick={(event) => {
                        SelectAccount(account.id);

                        event.preventDefault();
                        const location = {
                          pathname: `/account`,
                        };
                        history.push(location);
                      }}
                    >
                      <PencilSquare size={25} />
                    </Button>
                    <Button
                      variant='danger'
                      title='Delete'
                      className='td-button'
                      onClick={() => DeleteAccount(account.id)}
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

export default connect(null, mapDispatchToProps)(AccountList);
