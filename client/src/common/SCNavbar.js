import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
// import './Login.css';

//Site navbar
class SCNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <LinkContainer to="/">
                <a href="/">StudyConnect</a>
              </LinkContainer>
            </Navbar.Brand>
          </Navbar.Header>
          
          <Nav>
            <LinkContainer to="/selection">
              <NavItem eventKey={1}>
                Class Selection
              </NavItem>
            </LinkContainer>

            <LinkContainer to="/calendar">
              <NavItem eventKey={2}>
                Calendar
              </NavItem>
            </LinkContainer>

            <LinkContainer to="/login">
              <NavItem eventKey={3}>
                Login
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>
      </div>
    )
  }
}

export default SCNavbar;
