import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
//TODO: CSS styling

//TODO: Have the component source from Redux
//TODO: Create account form in state
export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  formIsValid() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  updateInfo = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submitForm = event => {
    //TODO: Log-in through backend
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.submitForm}>
          <FormGroup ControlId="email" bsSize="Large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.updateInfo}
            />
          </FormGroup>
          <FormGroup ControlId="password" bsSize="Large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="Large"
            disabled={!this.formIsValid()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    )
  }
}
