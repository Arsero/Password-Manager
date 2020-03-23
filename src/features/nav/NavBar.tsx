import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">Password Manager</Navbar.Brand>
        <Button variant="warning">
          <b>Add an account</b>
        </Button>
      </Container>
    </Navbar>
  );
};
