import { combineReducers } from 'redux'
import { SET_LOGIN, setLogin } from './../actions/login'

const initState = {
  isLoggedIn: false,
  token: ''
}
const login = (state = initState, action) => {
  switch(action.type) {
    case SET_LOGIN:
      let newState = {
        ...state,
        isLoggedIn: action.isLoggedIn,
        token: action.token
      }
      return newState
    default:
      return state
  }
}

export default combineReducers({
  login
})
