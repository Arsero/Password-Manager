import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Container, Button } from 'react-bootstrap';
import CryptUtils from '../../utils/CryptUtils';
import Account from '../../models/account';
import './styles.css';

const mapDispatchToProps = (dispatch: any) => {
  return {
    AddAccount: (account: Account) =>
      dispatch({ type: 'ADD_ACCOUNT', payload: account }),
    UpdateAccount: (account: Account) =>
      dispatch({ type: 'UPD_ACCOUNT', payload: account }),
    SetSelectedAccount: (account: Account) =>
      dispatch({ type: 'SELECT_ACCOUNT', payload: account }),
  };
};

const mapStateToProps = (state: any) => {
  return { selectedAccount: state.selectedAccount };
};

const AccountForm = ({
  selectedAccount,
  AddAccount,
  UpdateAccount,
  SetSelectedAccount,
}: any) => {
  const history = useHistory();
  const initializeForm = () => {
    if (selectedAccount) return selectedAccount;
    else {
      return {
        id: '',
        website: '',
        email: '',
        username: '',
        password: '',
        comment: '',
      };
    }
  };

  const [account, setAccount] = useState<Account>(initializeForm);

  const handleSubmit = (event) => {
    if (account.comment.length === 0) {
      setAccount({ ...account, comment: 'Nothing' });
    }

    if (selectedAccount) {
      UpdateAccount(account);
    } else {
      AddAccount(account);
    }

    event.preventDefault();
    const location = {
      pathname: '/',
    };
    history.push(location);
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.currentTarget;
    setAccount({ ...account, [name]: value });
  };

  return (
    <Container style={{ marginTop: '5em' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='website'>
          <Form.Label>Website</Form.Label>
          <Form.Control
            type='text'
            name='website'
            placeholder='Enter a website'
            onChange={handleInputChange}
            value={account.website}
          />
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='name@example.com'
            onChange={handleInputChange}
            value={account.email}
          />
        </Form.Group>
        <Form.Group controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            placeholder='Enter a username'
            onChange={handleInputChange}
            value={account.username}
          />
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='Enter a password'
            onChange={handleInputChange}
            value={account.password}
          />
        </Form.Group>
        <Button
          type='button'
          variant='info'
          block
          style={{ marginBottom: '15px' }}
          onClick={() => {
            setAccount({
              ...account,
              password: CryptUtils.generatePassword(8),
            });
          }}
        >
          Generate password
        </Button>
        <Form.Group controlId='comment'>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as='textarea'
            name='comment'
            rows={3}
            placeholder='None'
            onChange={handleInputChange}
            value={account.comment}
          />
        </Form.Group>
        <Button
          type='submit'
          variant='dark'
          style={{ margin: '25px auto' }}
          block
        >
          Submit
        </Button>
        <Button
          variant='danger'
          type='button'
          block
          onClick={(event) => {
            SetSelectedAccount(null);

            event.preventDefault();
            const location = {
              pathname: '/',
            };
            history.push(location);
          }}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
