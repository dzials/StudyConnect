import { $REQUEST } from './../util/api'

// === STRING CONSTANTS === //
export const FETCH_COURSES = "FETCH_COURSES"
export const FETCHING_COURSES = "FETCHING_COURSES"
export const RECEIVE_COURSES = "RECEIVE_COURSES"

export const FETCH_SECTIONS = "FETCH_SECTIONS"
export const FETCHING_SECTIONS = "FETCHING_SECTIONS"
export const RECEIVE_SECTIONS = "RECEIVE_SECTIONS"
export const SET_ERROR = "SET_ERROR"
export const REMOVE_SECTION = "REMOVE_SECTION"

// === COURSES(DEPRECATED) === //

// Action for setting "loading..." state for fetching course listing
export const fetchingCourses = () => {
  return {
    type: FETCHING_COURSES
  }
}

// Action used upon receiving course listing
export const receiveCourses = (courses) => {
  return {
    type: RECEIVE_COURSES,
    courses
  }
}

// Action used to get course listing from database
export const fetchCourses = () => (dispatch) => {
  dispatch(fetchingCourses)

  return fetch('/api/classes/')
  .then((res) => {
    return res.json()
  })
  .then((json) => {
    dispatch(receiveCourses(json))
  })
}

// === SECTIONS/COURSES(IN USE) === //

// Action used for "loading..." state with fetching course listing
export const fetchingSections = () => {
  return {
    type: FETCHING_SECTIONS
  }
}

// Action used upon receiving section listing
export const receiveSections = (sections) => {
  return {
    type: RECEIVE_SECTIONS,
    sections
  }
}

// Action used in event of an error from backend
export const setError = (error) => {
  return {
    type: SET_ERROR,
    error
  }
}

// Action used to get section listing from database
export const fetchSections = (name) => (dispatch) => {
  dispatch(fetchingSections)

  let body = {
    course_name: name
  }

  return $REQUEST('/api/classes/get_sections/', { body })
  .then((json) => {
    if(!json.error) {
      dispatch(receiveSections(json))
      dispatch(setError(''))
    }
    else {
      dispatch(setError(json.error))
    }
  })
  .catch((err) => {
    console.error(err)
  })
}

// For adding a class to a user's list of classes
export const addSection = (crn) => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    crn,
    token
  }

  return $REQUEST('/api/students/add_section/', { body })
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}

// Action to update the local state when a user tries to remove a section
export const removeSectionLocal = (crn) => {
  return {
    type: REMOVE_SECTION,
    crn
  }
}

// Action for a user removing a section (sends request to backend as well as
// updating local state)
export const removeSection = (crn) => (dispatch, getState) => {
  let state = getState()
  let token = state.login.login.token

  let body = {
    crn,
    token
  }

  return $REQUEST('/api/students/leave_section/', { body })
  .then((json) => {
    dispatch(removeSectionLocal())
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}
