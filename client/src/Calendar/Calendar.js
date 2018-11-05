import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import { getUserGroups, getUserCourses } from './../actions/login'

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

	showCourses() {
    return(
      <React.Fragment>
        {
          this.props.courses.map((item) => {
            return(
              <tr>
                <td>{item.course_name}</td>
              </tr>
            )
          })
        }
      </React.Fragment>
    )
  }

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
		}
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
