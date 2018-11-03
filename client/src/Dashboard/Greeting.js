import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
          <Link to="/login">Login</Link>
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
