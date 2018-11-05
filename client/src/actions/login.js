import { $POST } from './../util/api'

export const SET_LOGIN = "SET_LOGIN"
export const RECEIVE_USER_GROUPS = "RECEIVE_USER_GROUPS"
export const RECEIVE_USER_COURSES = "RECEIVE_USER_COURSES"

export const setLogin = (isLoggedIn, token) => {
  return {
    type: SET_LOGIN,
    isLoggedIn,
    token
  }
}

// =================
// export const fetchGroups = (course_name) => (dispatch, getState) => {
//   let state = getState()
//
//   let body = {
//     course_name
//   }
//
//   return $POST('/api/studygroups/get_studygroups/', { body })
//   .then((res) => {
//     let json = JSON.parse(res)
//     dispatch(receiveGroups(json))
//     console.log(json)
//   })
//   .catch((err) => {
//     console.error(err)
//   })
// }
// =============================

export const receiveUserGroups = (groups) => {
  return {
    type: RECEIVE_USER_GROUPS,
    groups
  }
}

export const getUserGroups = () => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    token
  }

  return $POST('/api/studygroups/get_user_groups/', { body })
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

export const receiveUserCourses = (courses) => {
  return {
    type: RECEIVE_USER_COURSES,
    courses
  }
}

export const getUserCourses = () => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    token
  }

  return $POST('/api/students/get_user_courses/', { body })
  .then((res) => {
    let json = JSON.parse(res)
    console.log(json)
    dispatch(receiveUserCourses(json))
  })
  .catch((err) => {
    console.error(err)
  })
}
