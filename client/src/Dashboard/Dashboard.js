import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'

import Greeting from './Greeting'
import ClassSelection from './ClassSelection'
import './Dashboard.css';

// TODO - have this component source from redux
export default class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Welcome to StudyConnect!</h1>
          <Greeting isLoggedIn={false}/>
        </Jumbotron>
        <ClassSelection />
      </div>
    )
  }
}
