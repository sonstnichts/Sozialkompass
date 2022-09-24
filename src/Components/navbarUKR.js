import React from "react";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from 'react-router-dom'; 

function NavBarUKR() {
  return (
    
    <Navbar collapseOnSelect sticky="top" bg="light" expand="lg">
       
            <Navbar.Brand href="/homeukr">
              <img
                src={require("../assets/logo/logo844x845.png")}
                width="32px"
                height="32px"
                className="d-inline-block align-top"
                alt="Sozialkompass Logo"
              />{" "}
              соціальний компас
            </Navbar.Brand>
          
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link href="/mainbodyUKR">меню програми </Nav.Link>
                <NavDropdown title="вибір програми" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/wohngeldUKR">житлова допомога</NavDropdown.Item>
                  <NavDropdown.Item href="#">аліменти</NavDropdown.Item>
                  <NavDropdown.Item href="#">
                  Допомога по безробіттю II
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="мову" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/">🇩🇪 Deutsch</NavDropdown.Item>
                  <NavDropdown.Item href="/homeukr">🇺🇦 українська </NavDropdown.Item> 
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          
      
    </Navbar>
  );
}

export default NavBarUKR;
