import { $POST } from './../util/api'

export const FETCH_COURSES = "FETCH_COURSES"
export const FETCHING_COURSES = "FETCHING_COURSES"
export const RECEIVE_COURSES = "RECEIVE_COURSES"

export const FETCH_SECTIONS = "FETCH_SECTIONS"
export const FETCHING_SECTIONS = "FETCHING_SECTIONS"
export const RECEIVE_SECTIONS = "RECEIVE_SECTIONS"
export const SET_ERROR = "SET_ERROR"

// === COURSES === //

export const fetchingCourses = () => {
  return {
    type: FETCHING_COURSES
  }
}

export const receiveCourses = (courses) => {
  return {
    type: RECEIVE_COURSES,
    courses
  }
}

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

// === SECTIONS === //

export const fetchingSections = () => {
  return {
    type: FETCHING_SECTIONS
  }
}

export const receiveSections = (sections) => {
  return {
    type: RECEIVE_SECTIONS,
    sections
  }
}

export const setError = (error) => {
  return {
    type: SET_ERROR,
    error
  }
}

export const fetchSections = (name) => (dispatch) => {
  dispatch(fetchingSections)

  let body = {
    course_name: name
  }

  return $POST('/api/classes/get_sections/', { body })
  .then((json) => {
    console.log(json)
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

  return $POST('/api/students/add_section/', { body })
  .then((json) => {
    console.log(json)
  })
  .catch((err) => {
    console.error(err)
  })
}
