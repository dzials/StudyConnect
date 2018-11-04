export const FETCH_COURSES = "FETCH_COURSES"
export const FETCHING_COURSES = "FETCHING_COURSES"
export const RECEIVE_COURSES = "RECEIVE_COURSES"

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
  //.then((res) => {
    //console.log(res.json())
    //return res.json()
  //})
  .then((json) => {
    dispatch(receiveCourses(json))
  })
}
