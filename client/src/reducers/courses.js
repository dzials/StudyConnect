import { combineReducers } from 'redux'
import {
  FETCHING_COURSES, RECEIVE_COURSES
} from './../actions/courses'

const initState = {
  fetching: false,
  courses: []
}

const courses = (state = initState, action) => {
  switch(action.type) {
    case FETCHING_COURSES:
      return { ...state, fetching: true }
    case RECEIVE_COURSES:
      // let courses = action.courses.map(course => course.name)
      // console.log(acton.courses)
      return { ...state, courses: action.courses, fetching: false }
    default:
      return initState
  }
}

export default combineReducers({
  courses
})
