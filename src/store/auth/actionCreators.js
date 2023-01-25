import { getUser } from "../../api/user"

const { SET_IS_AUTH, SET_USER } = require("./actions")

export const setAuth = (payload) => ({
  type: SET_IS_AUTH,
  payload: payload
})

export const setUser = (payload) => ({
  type: SET_USER,
  payload: payload
})

export const fetchUser =  () => async (dispatch) => {
  try {
    const response = await getUser()

    if (response.data) {
      dispatch(setUser(response.data))
      dispatch(setAuth(true))
    }
  } catch(e) {
    console.log(e)
  }
}