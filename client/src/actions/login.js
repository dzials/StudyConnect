import { $REQUEST } from './../util/api'

// === STRING CONSTANTS === //

export const SET_LOGIN = "SET_LOGIN"
export const RECEIVE_USER_GROUPS = "RECEIVE_USER_GROUPS"
export const RECEIVE_USER_COURSES = "RECEIVE_USER_COURSES"

// Action called when user is first logged in
export const setLogin = (isLoggedIn, token, userType) => {
  return {
    type: SET_LOGIN,
    isLoggedIn,
    token,
    userType
  }
}

// Action called when user's study groups are received from database
export const receiveUserGroups = (groups) => {
  return {
    type: RECEIVE_USER_GROUPS,
    groups
  }
}

// Action to retrieve a user's study groups from the database
export const getUserGroups = () => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    token
  }

  return $REQUEST('/api/studygroups/get_user_groups/', { body })
  .then((res) => {
    let parsed_groups = []
    for(let i = 0; i < res.groups.length; i++) {
      let group = JSON.parse(res.groups[i])
      parsed_groups.push(group[0])
    }
    console.log(parsed_groups)
    dispatch(receiveUserGroups(parsed_groups))
  })
  .catch((err) => {
    console.error(err)
  })
}

// Action for when the user receives his/her courses from the database
export const receiveUserCourses = (courses) => {
  return {
    type: RECEIVE_USER_COURSES,
    courses
  }
}

// Action for the async request to retrieve a user's courses from the database
export const getUserCourses = () => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    token
  }

  return $REQUEST('/api/students/get_user_courses/', { body })
  .then((res) => {
    let json = JSON.parse(res)
    console.log(json)
    dispatch(receiveUserCourses(json))
  })
  .catch((err) => {
    console.error(err)
  })
}
