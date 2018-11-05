import { combineReducers } from 'redux'
import { RECEIVE_GROUPS } from './../actions/studygroups'
// import { SET_LOGIN, setLogin } from './../actions/login'

const initState = {
  groups: []
}
// const login = (state = initState, action) => {
//   switch(action.type) {
//     case SET_LOGIN:
//       let newState = {
//         ...state,
//         isLoggedIn: action.isLoggedIn,
//         token: action.token
//       }
//       return newState
//     default:
//       return state
//   }
// }

const groups = (state = initState, action) => {
  switch(action.type) {
    case RECEIVE_GROUPS:
      let newState = {
        ...state,
        groups: action.groups
      }
      return newState
    default:
      return state
  }
}

export default combineReducers({
  groups
})
