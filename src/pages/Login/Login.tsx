import React, { useState } from 'react';
import { Person } from 'react-bootstrap-icons';
import { connect } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './styles.css';

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (secret: string) => dispatch({ type: 'LOGIN', payload: secret }),
  };
};

const Login = ({ login }: any) => {
  const [secret, setSecret] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const handleInputChange = (event: any) => {
    setSecret(event.currentTarget.value);
  };

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    login(secret);
    setBadPassword(true);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmitLogin} className='form-center'>
        <Form.Group controlId='password'>
          <div style={{ margin: 'auto', marginBottom: '30%' }}>
            <Person size={120} />
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

export default connect(null, mapDispatchToProps)(Login);
