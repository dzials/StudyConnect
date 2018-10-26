import React, { Component } from 'react';
import { connect } from 'react-redux'

import Selector from './Selector'

class Selection extends Component {
  render() {
    return (
      <Selector options={this.props.options}/>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    options: state.courses.courses.courses
  }
}

export default connect(
  mapStateToProps
)(Selection)
