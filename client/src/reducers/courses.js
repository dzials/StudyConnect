import { combineReducers } from 'redux'
import {
  FETCHING_COURSES, RECEIVE_COURSES,
  FETCHING_SECTIONS, RECEIVE_SECTIONS, SET_ERROR
} from './../actions/courses'

const initCourses = {
  fetching: false,
  courses: []
}

const courses = (state = initCourses, action) => {
  switch(action.type) {
    case FETCHING_COURSES:
      return { ...state, fetching: true }
    case RECEIVE_COURSES:
      return { ...state, courses: action.courses, fetching: false }
    default:
      return state
  }
}

const initSections = {
  fetching: false,
  sections: [],
  error: ''
}

const sections = (state = initSections, action) => {
  switch(action.type) {
    case FETCHING_SECTIONS:
      return { ...state, fetching: true }
    case RECEIVE_SECTIONS:
      return { ...state, sections: action.sections, fetching: false }
    case SET_ERROR:
      return { ...state, error: action.error }
    default:
      return state
  }
}

export default combineReducers({
  courses,
  sections
})
