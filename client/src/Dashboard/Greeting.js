import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

const JumbotronGreeting = ({ isLoggedIn }) => {
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
    <div>Logged in!</div>
  )
}

export default JumbotronGreeting
