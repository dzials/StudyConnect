import { combineReducers } from 'redux'
import { SET_LOGIN, RECEIVE_USER_GROUPS, RECEIVE_USER_COURSES } from './../actions/login'
import { REMOVE_GROUP } from './../actions/studygroups'
import { REMOVE_SECTION } from './../actions/courses'

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
        token: action.token,
        userType: action.userType
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
  let newState = {
    ...state
  }

  switch(action.type) {
    case RECEIVE_USER_GROUPS:
      newState.groups = action.groups
      return newState
    case REMOVE_GROUP:
      let groups = Object.create(state.groups)
      let index = -1
      for(let i = 0; i < groups.length; i++) {
        if(groups[i].pk == action.id) {
          index = i
          break
        }
      }
      groups.splice(index, 1)
      newState.groups = groups
      return newState
    default:
      return state
  }
}

const initCourses = {
  courses: []
}
const courses = (state = initCourses, action) => {
  let newState = {
    ...state
  }

  switch(action.type) {
    case RECEIVE_USER_COURSES:
      newState.courses = action.courses
      return newState
    case REMOVE_SECTION:
      let courses = Object.create(state.courses)
      let index = -1
      for(let i = 0; i < courses.length; i++) {
        if(courses[i].crn == action.crn) {
          index = i
          break
        }
      }
      courses.splice(index, 1)
      newState.courses = courses
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
