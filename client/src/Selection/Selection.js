import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchCourses, fetchSections, addSection } from './../actions/courses'
import Selector from './Selector'
import SectionList from './SectionList'

class Selection extends Component {
  componentDidMount() {
    this.props.fetchCourses()
  }

  render() {
    return (
      <div className="container">
        <Selector options={this.props.options} onChange={this.props.fetchSections} />
        <SectionList sections={this.props.sections} onAdd={this.props.addSection} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: () => {
      dispatch(fetchCourses())
    },
    fetchSections: (list) => {
      let name = ''
      if(list.length > 0) {
        name = list[0].name
      }
      dispatch(fetchSections(name))
    },
    addSection: (crn) => {
      dispatch(addSection(crn))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.courses.courses.courses,
    sections: state.courses.sections.sections
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Selection)
