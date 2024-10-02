import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import CartWidget from '../CartWidget';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './index.css';

const CustomNavbar = ({ totalQuantity }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-custom" expanded={expanded}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="me-auto" onClick={handleClose}>
          <img src={logo} alt="Logo Potis Restó" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/menu" onClick={handleClose}>Menú</Nav.Link>
            <Nav.Link as={Link} to="/locations" onClick={handleClose}>Sucursales</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleClose}>Contacto</Nav.Link>
            <Nav.Link as={Link} to="/cart" onClick={handleClose}>
              <CartWidget quantity={totalQuantity} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
