import React, { FormEvent, useState } from 'react';
import { connect } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import './styles.css';

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (secret: string) =>
      dispatch({ type: 'REGISTER', payload: secret }),
  };
};

const Register = ({ register }: any) => {
  const [secret, setSecret] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const handleInputChange = (event: any) => {
    setSecret(event.currentTarget.value);
  };

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    if (secret.length > 0) {
      register(secret);
    } else {
      setBadPassword(true);
    }
  };
  return (
    <Form onSubmit={handleSubmitLogin} className='form-center'>
      <Form.Group controlId='password'>
        <Form.Label>Register</Form.Label>
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
            The password can't be empty !
          </Alert>
        )}
      </Form.Group>
      <Button
        type='submit'
        variant='dark'
        style={{ margin: '25px auto', width: '200px' }}
      >
        Register
      </Button>
    </Form>
  );
};

export default connect(null, mapDispatchToProps)(Register);
