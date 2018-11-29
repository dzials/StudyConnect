import { $REQUEST } from './../util/api'

export const RECEIVE_GROUPS = "RECEIVE_GROUPS"
export const REMOVE_GROUP = "REMOVE_GROUP"

// Action for professors: create a professor-created studygroup
export const createGroup = (day, time, course_name) => (dispatch) => {
  let body = {
    day,
    time,
    course_name
  }

  return $REQUEST('/api/studygroups/create_studygroup/', { body })
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

// For adding a class to a user's list of classes
export const createGroups = () => (dispatch) => {
  return $REQUEST('/api/studygroups/create_studygroups/', {})
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

// Remove all studygroups ever created
export const deleteGroups = () => (dispatch) => {
  return $REQUEST('/api/studygroups/delete_studygroups/')
  .then((res) => {

  })
  .catch((err) => {
    console.log(err)
  })
}

// Action for when group listing is received from database
export const receiveGroups = (groups) => {
  return {
    type: RECEIVE_GROUPS,
    groups
  }
}

// Retrieve study group listing from database
export const fetchGroups = (course_name) => (dispatch, getState) => {
  let state = getState()

  let body = {
    course_name
  }

  return $REQUEST('/api/studygroups/get_studygroups/', { body })
  .then((res) => {
    let json = JSON.parse(res)
    dispatch(receiveGroups(json))
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

// Action for when a user wants to join a study group
export const joinGroup = (group_id) => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    group_id,
    token
  }

  return $REQUEST('/api/studygroups/join_studygroup/', { body })
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

// Action to update the local state when a user tries to remove a section
export const removeGroupLocal = (id) => {
  return {
    type: REMOVE_GROUP,
    id
  }
}

// Action for a user removing a section (sends request to backend as well as
// updating local state)
export const removeGroup = (id) => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    id,
    token
  }

  return $REQUEST('/api/studygroups/leave_studygroup/', { body })
  .then((json) => {
    dispatch(removeGroupLocal(id))
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}
