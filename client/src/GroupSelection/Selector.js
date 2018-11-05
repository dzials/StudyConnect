import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'

export default class Selector extends Component {
  render() {
    let options = this.props.options
    let onChange = this.props.onChange

    return (
      <div>
        <h1>
          Select a class to find a study group for:
        </h1>

        <Typeahead
          labelKey="name"
          multiple={false}
          options={options}
          placeholder="Select a class"
          minLength={3}
          onChange={onChange}
        />
      </div>
    )
  }
}
