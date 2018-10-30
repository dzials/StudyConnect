import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css"

//TODO: Use fetch API to parcel data to json and query back-end
//TODO: Have the component source from Redux
//TODO: Routing in submitForm for login and sign up
//TODO: In sign up check if password matches confirm password
export default class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmPw:"",
      rcs:"",
      isCreateNew: false
    };

    this.registerAcct = this.registerAcct.bind(this);
    this.loginToAcct = this.loginToAcct.bind(this);
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
    event.preventDefault();
    alert("To be implemented");
  }

  registerAcct() {
    this.setState({isCreateNew:true});
  }

  loginToAcct() {
    this.setState({isCreateNew:false});
  }

  render() {
    if(!this.state.isCreateNew) {
      return (
        <div className="Login">
          <form onSubmit={this.submitForm}>
            <h2>Login</h2>
            <FormGroup controlId="email" bsSize="Large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.updateInfo}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="Large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.updateInfo}
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
            <br></br>
            <a onClick={this.registerAcct}>Not registered? Click here</a>
          </form>
        </div>
      )
    }
    else if(this.state.isCreateNew) {
      return (
        <div className="SignUp">
          <form onSubmit={this.submitForm}>
            <h2>Sign Up</h2>
            <FormGroup controlId="email" bsSize="Large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.updateInfo}
              />
            </FormGroup>
            <FormGroup controlId="rcs" bsSize="Large">
              <ControlLabel>RCS ID</ControlLabel>
              <FormControl
                value={this.state.rcs}
                onChange={this.updateInfo}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="Large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.updateInfo}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="confirmPw" bsSize="Large">
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                value={this.state.confirmPw}
                onChange={this.updateInfo}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsSize="Large"
              disabled={!this.formIsValid()}
              type="submit"
            >
              Sign Up
            </Button>
            <br></br>
            <a onClick={this.loginToAcct}>Already registered? Click here</a>
          </form>
        </div>
      )
    }
  }
}
