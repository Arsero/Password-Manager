import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';
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
      setAccount({ ...account, comment: 'None' });
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
    <Container style={{ marginTop: '5em', width: '70%', maxWidth: '800px' }}>
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
          <Row>
            <Col>
              <Form.Control
                type='password'
                name='password'
                placeholder='Enter a password'
                onChange={handleInputChange}
                value={account.password}
              />
            </Col>
            <Col>
              <Button
                type='button'
                variant='outline-dark'
                block
                onClick={() => {
                  setAccount({
                    ...account,
                    password: CryptUtils.generatePassword(8),
                  });
                }}
              >
                Generate password
              </Button>
            </Col>
          </Row>
        </Form.Group>
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
        <Row style={{ marginTop: '15px' }}>
          <Col>
            <Button type='submit' variant='dark' block>
              {selectedAccount ? (
                <span>Edit account</span>
              ) : (
                <span>Add account</span>
              )}
            </Button>
          </Col>
          <Col>
            <Button
              variant='outline-danger'
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
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountForm);
