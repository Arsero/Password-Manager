import React, { useState } from 'react';
import { PersonFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../actions/actions';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './styles.css';

const Login = () => {
  const [secret, setSecret] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [badPassword, setBadPassword] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleInputChange = (event: any) => {
    const { name, value } = event.currentTarget;
    if (name === 'email') {
      setEmail(value);
    } else {
      setSecret(value);
    }
  };

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    dispatch(actions.Login(email, secret));
    setBadPassword(true);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmitLogin} className='form-center'>
        <Form.Group controlId='logo'>
          <div
            style={{
              margin: '0 auto',
              marginBottom: '25%',
              textAlign: 'center',
            }}
          >
            <PersonFill size={120} />
          </div>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            name='email'
            placeholder='Enter your email'
            onChange={handleInputChange}
            value={email}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            onChange={handleInputChange}
            value={secret}
            required
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
          Sign In
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
