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
  const [secret, setSecret] = useState('');
  const [badPassword, setBadPassword] = useState(false);

  const handleInputChange = (event: any) => {
    setSecret(event.currentTarget.value);
  };

  const handleSubmitLogin = (event: any) => {
    event.preventDefault();
    if (secret.length > 0) {
      const isWasLogged = isLogged;
      dispatch(actions.Register(secret));

      if (isWasLogged) {
        Notify('✔️ Secret updated !');
        const location = {
          pathname: '/',
        };
        history.push(location);
      } else {
        Notify('✔️ Secret saved !');
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

export default Register;
