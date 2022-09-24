import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";




function NavBar() {
  return (
    
    <Navbar collapseOnSelect sticky="top" bg="light" expand="lg">
       
            <Navbar.Brand href="#">
              <img
                src={require("../assets/logo/logo844x845.png")}
                width="32px"
                height="32px"
                className="d-inline-block align-top"
                alt="Sozialkompass Logo"
              />{" "}
              Sozialkompass
            </Navbar.Brand>
          
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Antragsmenü</Nav.Link>
                <NavDropdown title="Antragsauswahl" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Wohngeld</NavDropdown.Item>
                  <NavDropdown.Item href="#">Kindergeld</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                    Arbeitslosengeld II
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#">Kategorie 4</NavDropdown.Item>
                  <NavDropdown.Item href="#">Kategorie 5</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Sprache" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Deutsch</NavDropdown.Item>
                  <NavDropdown.Item href="#">Ukrainisch</NavDropdown.Item> 
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          
      
    </Navbar>
  );
}

export default NavBar;
