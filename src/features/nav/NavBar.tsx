import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";



export const NavBar = () => {
  const history = useHistory();

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">Password Manager</Navbar.Brand>
        <Button variant="warning"
          onClick={() => {
            const location = {
              pathname: '/createAccount'
            }
            history.push(location);
          }}>
          <b>Add an account</b>
        </Button>
      </Container>
    </Navbar>
  );
};
