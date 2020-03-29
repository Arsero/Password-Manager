import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";

interface IProps {
  isLogged: boolean;
}

export const NavBar: React.FC<IProps> = ({ isLogged }) => {
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Password Manager</Navbar.Brand>
        {isLogged && (
          <Button
            variant="warning"
            onClick={() => {
              const location = {
                pathname: "/createAccount"
              };
              history.push(location);
            }}
          >
            <b>Add an account</b>
          </Button>
        )}
      </Container>
    </Navbar>
  );
};
