import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import CartWidget from '../CartWidget';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './index.css';

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="" className="me-auto">
          <img src={logo} alt="Logo Potis Restó" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/menu">Menú</Nav.Link>
            <Nav.Link as={Link} to="/locations">Sucursales</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              <CartWidget />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
