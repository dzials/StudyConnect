import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

export default class Selector extends Component {
  render() {
    let options = this.props.options

    console.log(options)

    return (
      <div className="container">
        <h1>
          Select a class to find a study group for:
        </h1>

        <Typeahead
          labelKey="name"
          multiple={false}
          options={options}
          placeholder="Select a class"
          minLength={3}
        />

        <h1>
          Available study groups:
        </h1>
      </div>
    )
  }
}
