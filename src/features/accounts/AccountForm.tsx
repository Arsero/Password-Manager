import React, { useState, FormEvent } from "react";
import { Form, Container, Button, ButtonGroup } from "react-bootstrap";
import "./styles.css";
import { IAccount } from "../../app/models/account";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router-dom";

interface IProps {
  account: IAccount;
  createAccount: (account: IAccount) => void;
  editAccount: (account: IAccount) => void;
  setSelectedAccount: (account: IAccount | null) => void;
}

const AccountForm: React.FC<IProps> = ({
  account: initialFormState,
  createAccount,
  editAccount,
  setSelectedAccount
}) => {
  const history = useHistory();
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

  const handleSubmit = event => {
    if (account.id.length === 0) {
      let newAccount = {
        ...account,
        id: uuid()
      };
      createAccount(newAccount);
    } 
    else {
      editAccount(account);
    }

    setSelectedAccount(null);

    event.preventDefault();
    const location = {
      pathname: "/"
    };
    history.push(location);
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
            value={account.website}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="name@example.com"
            onChange={handleInputChange}
            value={account.email}
          />
        </Form.Group>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter a username"
            onChange={handleInputChange}
            value={account.username}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter a password"
            onChange={handleInputChange}
            value={account.password}
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
            value={account.comment}
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
        <Button
          variant="danger"
          type="button"
          block
          onClick={() => {
            setSelectedAccount(null);

            const location = {
              pathname: "/"
            };
            history.push(location);
          }}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default AccountForm;
