import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PersonPlusFill } from 'react-bootstrap-icons';
import './styles.css';

const mapStateToProps = (state: any) => {
  return { isLogged: state.isLogged };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    register: (secret: string) =>
      dispatch({ type: 'REGISTER', payload: secret }),
  };
};

const Register = ({ register, isLogged }: any) => {
  const history = useHistory();
  const [secret, setSecret] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const handleInputChange = (event: any) => {
    setSecret(event.currentTarget.value);
  };

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    if (secret.length > 0) {
      const isWasLogged = isLogged;
      register(secret);

      if (isWasLogged) {
        const location = {
          pathname: '/',
        };
        history.push(location);
      }
    } else {
      setBadPassword(true);
    }
  };
  return (
    <Form onSubmit={handleSubmitLogin} className='form-center'>
      <Form.Group controlId='password'>
        <div
          style={{
            margin: '0 auto',
            marginBottom: '25%',
            textAlign: 'center',
          }}
        >
          <PersonPlusFill size={120} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
