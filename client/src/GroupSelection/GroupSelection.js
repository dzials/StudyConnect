import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

import { fetchCourses } from './../actions/courses'
import { fetchGroups, joinGroup, createGroup } from './../actions/studygroups'
import { getUserCourses } from './../actions/login'
import Selector from './Selector'
import GroupList from './GroupList'

class GroupSelection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      create: false
    }

    this.profView = this.profView.bind(this)
    this.studentView = this.studentView.bind(this)
    this.showList = this.showList.bind(this)
    this.showForm = this.showForm.bind(this)
    this.submitForm = this.submitForm.bind(this)
  }

  componentDidMount() {
    this.props.fetchCourses()
		this.props.getUserCourses()
	}

  // For use with submitting a new study group (only for professors)
  submitForm() {
    let day = this.state.day
    let time = this.state.time
    let course_name = this.state.course_name
    this.props.createGroup(day, time, course_name)

    // Make the form go away by resetting state
    this.setState({create: false})
  }

  // When a professor enters a new study group's details, update the state
  updateInfo = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // If the professor wants to create a study group, render a form to enter
  // study group details into
  showForm() {
    if(this.state.create) {
      return(
        <div>
          <form onSubmit={this.submitForm}>
            <FormGroup controlId="day" bsSize="Large">
              <ControlLabel>Day</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.day}
                onChange={this.updateInfo}
              />
            </FormGroup>
            <FormGroup controlId="time" bsSize="Large">
              <ControlLabel>Time</ControlLabel>
              <FormControl
                value={this.state.time}
                onChange={this.updateInfo}
                type="text"
              />
            </FormGroup>
            <Button
              block
              bsSize="Large"
              type="submit"
            >
              Create Group
            </Button>
          </form>
        </div>
      )
    }
    else {
      return(
        <div></div>
      )
    }
  }

  // Render the list of available study groups to join
  // Also renders a button next to each to allow joining of selected group
  showList() {
    return(
      <React.Fragment>
        {
          this.props.courses.map((item) => {
            return(
              <tr>
                <td>{item.course_name}</td>
                <td>
                  <Button
                    bsStyle="success"
                    onClick={()=>{ this.setState({create: true, course_name: item.course_name}) }}
                  >
                    Create Group
                  </Button>
                </td>
              </tr>
            )
          })
        }
      </React.Fragment>
    )
  }

  // This will only render for professors (creating groups)
  profView() {
    return(
      <React.Fragment>
        <Table striped bordered condensed hover className="Selection-Table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Click To Make Group</th>
            </tr>
          </thead>
          <tbody>
            {this.showList()}
          </tbody>
        </Table>
        <div>
          {this.showForm()}
        </div>
      </React.Fragment>
    )
  }

  // This will only render for students (selecting groups)
  studentView() {
    return (
      <React.Fragment>
        <Selector options={this.props.options} onChange={this.props.fetchGroups} />
        <GroupList groups={this.props.groups} onJoin={this.props.joinGroup} />
      </React.Fragment>
    )
  }

  // Determine if logged in user is student or professor
  showView() {
    if(this.props.userType == "STUDENT") {
      return this.studentView()
    }
    else {
      return this.profView()
    }
  }

  render() {
    return (
      <div className="container">
        {this.showView()}
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
    },
    getUserCourses: () => {
      dispatch(getUserCourses())
    },
    createGroup: (day, time, course_name) => {
      dispatch(createGroup(day, time, course_name))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.login.courses.courses,
    options: state.courses.courses.courses,
    groups: state.studygroups.groups.groups,
    userType: state.login.login.userType
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupSelection)
