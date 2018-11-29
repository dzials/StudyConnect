import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import { getUserGroups, getUserCourses } from './../actions/login'
import { removeSection } from './../actions/courses'
import { removeGroup } from './../actions/studygroups'

class Calendar extends Component {
	constructor(props) {
		super(props)

		this.showCourses = this.showCourses.bind(this)
		this.showGroups = this.showGroups.bind(this)
	}

	componentDidMount() {
		this.props.getUserGroups()
		this.props.getUserCourses()
	}

	// Renders the courses that the logged in user is a part of.
	// Map each course to a button that gives user the ability to leave the course.
	showCourses() {
    return(
      <React.Fragment>
        {
          this.props.courses.map((item) => {
						return(
								<tr>
	                <td>{item.course_name}</td>
									<td>
										<Button
											bsStyle="danger"
											onClick={()=>{this.props.removeSection(item.crn)}}
										>
											Leave class
										</Button>
									</td>
	              </tr>

            )
          })
        }
      </React.Fragment>
    )
  }

	// Renders the groups that the logged in user is a part of.
	// Map each group to a button that gives user the ability to leave the group.
	showGroups() {
    return(
      <React.Fragment>
        {
          this.props.groups.map((item) => {
            return(
              <tr>
                <td>{item.fields.course_name}</td>
								<td>{item.fields.day}</td>
								<td>{item.fields.time}</td>
								<td>
									<Button
										bsStyle="danger"
										onClick={()=>{this.props.removeGroup(item.pk)}}
									>
										Leave group
									</Button>
								</td>
              </tr>
            )
          })
        }
      </React.Fragment>
    )
  }

  render() {
    return (
			<div className="container">
				<h2>COURSES</h2>

				<Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Course Name</th>
							<th>Remove Class</th>
            </tr>
          </thead>
          <tbody>
            {this.showCourses()}
          </tbody>
        </Table>

				<h2>STUDY GROUPS</h2>

				<Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Course Name</th>
							<th>Day</th>
							<th>Time</th>
							<th>Remove Group</th>
            </tr>
          </thead>
          <tbody>
            {this.showGroups()}
          </tbody>
        </Table>
			</div>
    )
  }
}

const mapStateToProps = state => {
  return {
		courses: state.login.courses.courses,
		groups: state.login.groups.groups
	}
}

const mapDispatchToProps = dispatch => {
  return {
    getUserCourses: () => {
      dispatch(getUserCourses())
    },
		getUserGroups: () => {
			dispatch(getUserGroups())
		},
		removeSection: (crn) => {
			dispatch(removeSection(crn))
		},
		removeGroup: (id) => {
			dispatch(removeGroup(id))
		}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
