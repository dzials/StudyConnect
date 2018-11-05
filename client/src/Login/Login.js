import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { $POST } from './../util/api'
import { setLogin } from './../actions/login'
import "./Login.css"

class Login extends Component {
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
    this.displayInvalid = this.displayInvalid.bind(this);
  }

  //Make sure form is valid
  formIsValid() {
    if(this.state.isCreateNew) {
      return this.state.email.length > 0 && this.state.password.length > 0 && this.state.confirmPw.length > 0 && this.state.rcs.length > 0 && this.pwMatch();
    }
    else if(!this.state.isCreateNew) {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }
  }

  //In account registration make sure passwords match
  pwMatch() {
    return this.state.password===this.state.confirmPw;
  }

  //Update state as form is filled out
  updateInfo = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  //Package form data into appropriate .JSON and query back end
  submitForm = event => {
    event.preventDefault();
    let body = {
      email: this.state.email,
      password: this.state.password,
      rcs: this.state.rcs
    }
    if(this.state.isCreateNew) {
      $POST('api/students/create_student/', {body: body})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
    else if(!this.state.isCreateNew) {
      $POST('api/students/auth_student/', {body: body})
      .then((res) => {
        // Successfully auth'd
        if(res.match) {
          this.props.setLogin(true, res.token)
          this.setState({toDashboard: true})
        }
        // Auth failed
        else {
          this.setState({invalidCreds: true})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  //Switch to account registration state
  registerAcct() {
    this.setState({isCreateNew:true});
  }

  //Switch to login state
  loginToAcct() {
    this.setState({isCreateNew:false});
  }

  displayInvalid() {
    if(this.state.invalidCreds) {
      return(
        <h4 className="Invalid">Incorrect email/password</h4>
      )
    }
    return(
      <div></div>
    )
  }

  render() {
    // Redirect after logging in
    if(this.state.toDashboard) {
      return(
        <Redirect to="/" />
      )
    }

    //Login form
    if(!this.state.isCreateNew) {
      return (
        <div className="Login">
          <form onSubmit={this.submitForm}>
            <h2>Login</h2>
            <div>{this.displayInvalid()}</div>
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

    //If password field does not match confirm password
    else if(this.state.isCreateNew) {
      let pwNoMatch;
      if(!this.pwMatch()) {
        pwNoMatch = <p>Passwords must match!</p>
      }
      else {
        pwNoMatch = <p></p>;
      }

      //Sign Up form
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
            {pwNoMatch}
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

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setLogin: (isLoggedIn, token) => {
      dispatch(setLogin(isLoggedIn, token))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
