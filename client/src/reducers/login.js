import { combineReducers } from 'redux'
import { SET_LOGIN, setLogin } from './../actions/login'

const initState = {
  isLoggedIn: false
}
const login = (state = initState, action) => {
  switch(action.type) {
    case SET_LOGIN:
      let newState = {
        isLoggedIn: action.isLoggedIn
      }
      return newState
    default:
      return initState
  }
}

export default combineReducers({
  login
})
