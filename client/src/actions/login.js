export const SET_LOGIN = "SET_LOGIN"

export const setLogin = (isLoggedIn, token) => {
  return {
    type: SET_LOGIN,
    isLoggedIn,
    token
  }
}
