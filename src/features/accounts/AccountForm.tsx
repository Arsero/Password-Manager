import React, { useState, FormEvent } from "react";
import { Form, Container, Button, ButtonGroup } from "react-bootstrap";
import "./styles.css";
import { IAccount } from "../../app/models/account";
import { v4 as uuid } from "uuid";

interface IProps {
  account: IAccount;
  createAccount: (account: IAccount) => void;
  editAccount: (account: IAccount) => void;
}

const AccountForm: React.FC<IProps> = ({
  account: initialFormState,
  createAccount,
  editAccount
}) => {
  const initializeForm = () => {
    if (initialFormState) return initialFormState;
    else {
      return {
        id: "",
        website: "",
        email: "",
        username: "",
        password: "",
        comment: ""
      };
    }
  };

  const [account, setAccount] = useState<IAccount>(initializeForm);

  const handleSubmit = () => {
    if (account.id.length === 0) {
      let newAccount = {
        ...account,
        id: uuid()
      };
      createAccount(newAccount);
    } else {
      editAccount(account);
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setAccount({ ...account, [name]: value });
  };

  return (
    <Container style={{ marginTop: "5em" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            name="website"
            placeholder="Enter a website"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter a username"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="comment">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            name="comment"
            rows="3"
            placeholder="Any comment for your account ? Like a question."
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="dark"
          style={{ margin: "25px auto" }}
          block
        >
          Submit
        </Button>
        <Button variant="danger" type="button" block>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default AccountForm;
