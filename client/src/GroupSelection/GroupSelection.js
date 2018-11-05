import React, { Component } from 'react';
import { connect } from 'react-redux'

import { fetchCourses } from './../actions/courses'
import { fetchGroups, joinGroup } from './../actions/studygroups'
import Selector from './Selector'
import GroupList from './GroupList'

class GroupSelection extends Component {
  componentDidMount() {
    this.props.fetchCourses()
  }

  render() {
    return (
      <div className="container">
        <Selector options={this.props.options} onChange={this.props.fetchGroups} />
        <GroupList groups={this.props.groups} onJoin={this.props.joinGroup} />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: () => {
      dispatch(fetchCourses())
    },
    fetchGroups: (list) => {
      let name = ''
      if(list.length > 0) {
        name = list[0].name
      }
      dispatch(fetchGroups(name))
    },
    joinGroup: (id) => {
      dispatch(joinGroup(id))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    options: state.courses.courses.courses,
    groups: state.studygroups.groups.groups
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelection)
