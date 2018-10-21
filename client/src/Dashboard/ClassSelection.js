import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

import './Dashboard.css';

// TODO - have this component source from redux
export default class ClassSelection extends Component {
  render() {
    let options = [
      { type: "CSCI" },
      { type: "BIOL" },
      { type: "PSYC" }
    ]

    return (
      <div className="container">
        <Typeahead
          labelKey="type"
          multiple={false}
          options={options}
          placeholder="Choose a class type"
        />
      </div>
    )
  }
}
