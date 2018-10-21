import React from 'react'
import { Button } from 'react-bootstrap'

const JumbotronGreeting = ({ isLoggedIn }) => {
  if(!isLoggedIn) {
    return (
      <React.Fragment>
        <p>
          Uh oh! It looks like you aren't logged in. Click the button below
          to do so!
        </p>
        <p>
          <Button bsStyle="success" bsSize="large">Login</Button>
        </p>
      </React.Fragment>
    )
  }
  return (
    <div>Logged in!</div>
  )
}

export default JumbotronGreeting
