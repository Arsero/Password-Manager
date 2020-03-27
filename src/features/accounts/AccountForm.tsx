import React from "react";
import { Form, Container, Button, ButtonGroup } from "react-bootstrap";
import "./styles.css";

export const AccountForm = () => {
  return (
    <Container>
      <Form>
        <Form.Group controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control type="text" placeholder="Enter a website" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter a username" />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter a password" />
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Any comment for your account ? Like a question."
          />
        </Form.Group>
          <Button type="submit" variant="dark" style={{ margin: "25px auto" }} block>
            Submit
          </Button>
          <Button variant="danger" block>Cancel</Button>
      </Form>
    </Container>
  );
};
