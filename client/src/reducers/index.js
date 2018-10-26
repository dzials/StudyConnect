import { combineReducers } from 'redux'
import login from './login'
import courses from './courses'

export default combineReducers({
  login,
  courses
})
