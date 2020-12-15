import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
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

const AccountList = ({
  accounts,
  DeleteAccount,
  CopyPassword,
  SelectAccount,
}: any) => {
  const history = useHistory();
  return (
    <Container style={{ marginTop: '5em', width: '80%', minWidth: '800px' }}>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Website</th>
            <th>Email address</th>
            <th>Username</th>
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
                <td>{account.comment}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    style={{
                      marginRight: '10px',
                      padding: '5px',
                      paddingTop: '3px',
                    }}
                    variant='outline-dark'
                    title='Copy'
                    className='td-button'
                    size='sm'
                    onClick={() => CopyPassword(account.id)}
                  >
                    <Files size={18} />
                  </Button>
                  <Button
                    variant='outline-dark'
                    style={{
                      marginRight: '10px',
                      padding: '5px',
                      paddingTop: '3px',
                    }}
                    title='Edit'
                    className='td-button'
                    size='sm'
                    onClick={(event) => {
                      SelectAccount(account);

                      event.preventDefault();
                      const location = {
                        pathname: `/account`,
                      };
                      history.push(location);
                    }}
                  >
                    <PencilSquare size={18} />
                  </Button>
                  <Button
                    variant='outline-danger'
                    size='sm'
                    title='Delete'
                    className='td-button'
                    style={{ padding: '5px', paddingTop: '3px' }}
                    onClick={() => DeleteAccount(account.id)}
                  >
                    <Trash size={18} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default connect(null, mapDispatchToProps)(AccountList);
