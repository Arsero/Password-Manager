import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { PersonPlusFill } from 'react-bootstrap-icons';
import State from '../../models/state';
import { Notify } from '../../containers/notifications/Notification';
import * as actions from '../../actions/actions';
import './styles.css';

const Register = () => {
  const history = useHistory();
  const isLogged = useSelector((state: State) => state.isLogged);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [badPassword, setBadPassword] = useState<boolean>(false);

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
    if (email.length > 0 && secret.length > 0) {
      const isWasLogged = isLogged;
      dispatch(actions.Register(email, secret));

      if (isWasLogged) {
        Notify('✔️ Main account updated !');
        const location = {
          pathname: '/',
        };
        history.push(location);
      } else {
        Notify('✔️ Main account saved !');
      }
    } else {
      setBadPassword(true);
    }
  };

  return (
    <Form onSubmit={handleSubmitLogin} className='form-center'>
      <Form.Group controlId='logo'>
        <div
          style={{
            margin: '0 auto',
            marginBottom: '25%',
            textAlign: 'center',
          }}
        >
          <PersonPlusFill size={120} />
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
            The email address or the password can't be empty !
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

export default Register;
