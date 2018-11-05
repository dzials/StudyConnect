import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux'

//Site navbar
class SCNavbar extends Component {
  constructor(props) {
    super(props)

    this.showOptions = this.showOptions.bind(this)
  }

  showOptions() {
    // Logged in
    if(this.props.token && this.props.token != '') {
      return(
        <React.Fragment>
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

          <LinkContainer to="/groupselection">
            <NavItem eventKey={4}>
              Group Selection
            </NavItem>
          </LinkContainer>
        </React.Fragment>
      )
    }
    // Not logged in
    else {
      return(
        <React.Fragment>
          <LinkContainer to="/login">
            <NavItem eventKey={3}>
              Login
            </NavItem>
          </LinkContainer>
        </React.Fragment>
      )
    }
  }

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
            {this.showOptions()}
          </Nav>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.login.token
  }
}

export default connect(
  mapStateToProps
)(SCNavbar)
