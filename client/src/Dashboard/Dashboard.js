import React, { Component } from 'react';
import { Jumbotron, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { createGroups } from './../actions/studygroups'
import Greeting from './Greeting'
import './Dashboard.css';

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Jumbotron>
          <h1>Welcome to StudyConnect!</h1>
          <Greeting isLoggedIn={false}/>
        </Jumbotron>

        <p>For demo purposes only:</p>
        <Button bsStyle="primary" onClick={() => {this.props.genGroups()}}>Generate Study Groups</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    genGroups: () => {
      dispatch(createGroups())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
