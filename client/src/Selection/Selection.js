import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

// TODO - have this component source from redux
export default class Selection extends Component {
  render() {
    let options = [
      { type: "CSCI" },
      { type: "BIOL" },
      { type: "PSYC" }
    ]

    return (
      <div className="container">
        <h1>
          Select a class to find a study group for:
        </h1>

        <Typeahead
          labelKey="type"
          multiple={false}
          options={options}
          placeholder="Select a class"
        />

        <h1>
          Available study groups:
        </h1>
      </div>
    )
  }
}
