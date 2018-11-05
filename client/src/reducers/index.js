import { combineReducers } from 'redux'
import login from './login'
import courses from './courses'
import studygroups from './studygroups'

export default combineReducers({
  login,
  courses,
  studygroups,
})
