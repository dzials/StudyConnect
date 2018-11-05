import { combineReducers } from 'redux'
import { SET_LOGIN, RECEIVE_USER_GROUPS, RECEIVE_USER_COURSES } from './../actions/login'

const initLogin = {
  isLoggedIn: false,
  token: ''
}
const login = (state = initLogin, action) => {
  switch(action.type) {
    case SET_LOGIN:
      let newState = {
        ...state,
        isLoggedIn: action.isLoggedIn,
        token: action.token
      }
      return newState
    default:
      return state
  }
}

const initGroups = {
  groups: []
}
const groups = (state = initGroups, action) => {
  switch(action.type) {
    case RECEIVE_USER_GROUPS:
      let newState = {
        ...state,
        groups: action.groups
      }
      return newState
    default:
      return state
  }
}

const initCourses = {
  courses: []
}
const courses = (state = initCourses, action) => {
  switch(action.type) {
    case RECEIVE_USER_COURSES:
      let newState = {
        ...state,
        courses: action.courses
      }
      return newState
    default:
      return state
  }
}

export default combineReducers({
  login,
  groups,
  courses
})
