import React, { useState, FormEvent } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import "./styles.css";
import { useHistory } from "react-router-dom";

interface IProps {
  checkPassword: (password) => boolean;
  isRegister: boolean;
  setisLogged: (logged: boolean) => void;
  registerPassword: (pwd: string) => boolean;
}

export const Login: React.FC<IProps> = ({
  checkPassword,
  isRegister,
  setisLogged,
  registerPassword
}) => {
  const [password, setPassword] = useState("");
  const [isFalsePassword, setisFalsePassword] = useState(false);
  const history = useHistory();

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmitLogin = event => {
    // check if file exist !
    // load crypted file, if no error loggedin
    event.preventDefault(); // fix warning form cancelled
    if (checkPassword(password)) {
      console.log("Connected");
      setisLogged(true);
      const location = {
        pathname: "/accounts"
      };
      history.push(location);
    } else {
      setisFalsePassword(true);
    }
  };

  const handleSubmitRegister = event => {
    event.preventDefault(); // fix warning form cancelled
    if (registerPassword(password)) {
      setisLogged(true);

      const location = {
        pathname: "/accounts"
      };
      history.push(location);
    } else {
      setisFalsePassword(true);
    }
  };

  return (
    <Container>
      {isRegister && (
        <Form onSubmit={handleSubmitLogin} className="form-center">
          <Form.Group controlId="password">
            <Form.Label>Login</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={password}
            />
            {isFalsePassword && (
              <Alert
                variant="danger"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <b>The password is incorrect !</b>
              </Alert>
            )}
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            style={{ margin: "25px auto", width: "200px" }}
          >
            Login
          </Button>
        </Form>
      )}

      {!isRegister && (
        <Form onSubmit={handleSubmitRegister} className="form-center">
          <Form.Group controlId="password">
            <Form.Label>Register</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={password}
            />
            {isFalsePassword && (
              <Alert
                variant="danger"
                style={{ marginTop: "10px", marginBottom: "10px" }}
              >
                <b>The password can't be empty !</b>
              </Alert>
            )}
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            style={{ margin: "25px auto", width: "200px" }}
          >
            Register
          </Button>
        </Form>
      )}
    </Container>
  );
};
