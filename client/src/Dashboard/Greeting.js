import React from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

const JumbotronGreeting = ({ isLoggedIn }) => {
  if(!isLoggedIn) {
    return (
      <React.Fragment>
        <p>
          Uh oh! It looks like you aren't logged in. Click the login button above to do so!
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
