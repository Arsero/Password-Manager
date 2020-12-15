import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import './styles.css';

export const Sidebar = ({ Close }: any) => {
  const history = useHistory();

  return (
    <Container
      style={{
        margin: '50px',
      }}
    >
      <Form>
        <Form.Group>
          <Button
            variant='outline-light'
            style={{ marginBottom: '30px', marginRight: '50px' }}
            onClick={(event) => {
              Close();
              event.preventDefault();
              const location = {
                pathname: '/account',
              };
              history.push(location);
            }}
          >
            Add an account
          </Button>
          <Button
            variant='outline-light'
            style={{ marginLeft: '5px' }}
            onClick={(event) => {
              Close();
              event.preventDefault();
              const location = {
                pathname: '/secret',
              };
              history.push(location);
            }}
          >
            Update secret
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
