import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'reactstrap'

const JumbotronGreeting = ({ isLoggedIn }) => {
  //If user not signed in, display a jumbotron with a sign in button
  if(!isLoggedIn) {
    return (
      <React.Fragment>
        <p>
          Uh oh! It looks like you aren't logged in. Click the button below
          to do so!
        </p>
        <p>
          <div class="Button">
          <Button color="success" size="lg" tag={Link} to="/login">Login</Button>
          </div>
        </p>
      </React.Fragment>
    )
  }
  return (
    <p>Welcome! Add some classes to get started...</p>
  )
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.login.login.isLoggedIn
  }
}

export default connect(
  mapStateToProps
)(JumbotronGreeting)
