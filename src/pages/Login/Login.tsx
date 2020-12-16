import React, { useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import * as actions from '../../actions/actions';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './styles.css';

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (secret: string) => dispatch({ type: 'LOGIN', payload: secret }),
  };
};

const Login = () => {
  const [secret, setSecret] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const dispatch = useDispatch();
  const handleInputChange = (event: any) => {
    setSecret(event.currentTarget.value);
  };

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    dispatch(actions.Login(secret));
    setBadPassword(true);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmitLogin} className='form-center'>
        <Form.Group controlId='password'>
          <div
            style={{
              margin: '0 auto',
              marginBottom: '25%',
              textAlign: 'center',
            }}
          >
            <PersonFill size={120} />
          </div>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            onChange={handleInputChange}
            value={secret}
          />
          {badPassword && (
            <Alert
              variant='danger'
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >
              The password is incorrect !
            </Alert>
          )}
        </Form.Group>
        <Button
          type='submit'
          variant='dark'
          style={{ margin: '25px auto', width: '200px' }}
        >
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
