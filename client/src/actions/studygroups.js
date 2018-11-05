import { $POST } from './../util/api'

export const RECEIVE_GROUPS = "RECEIVE_GROUPS"

// For adding a class to a user's list of classes
export const createGroups = () => (dispatch) => {
  return $POST('/api/studygroups/create_studygroups/', {})
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

export const receiveGroups = (groups) => {
  return {
    type: RECEIVE_GROUPS,
    groups
  }
}

export const fetchGroups = (course_name) => (dispatch, getState) => {
  let state = getState()

  let body = {
    course_name
  }

  return $POST('/api/studygroups/get_studygroups/', { body })
  .then((res) => {
    let json = JSON.parse(res)
    dispatch(receiveGroups(json))
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

export const joinGroup = (group_id) => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    group_id,
    token
  }

  return $POST('/api/studygroups/join_studygroup/', { body })
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}
