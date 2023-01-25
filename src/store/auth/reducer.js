const { SET_IS_AUTH, SET_USER } = require("./actions")

const initialState = {
  isAuth: false,
  user: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_AUTH:
      return {...state, isAuth: action.payload};
    case SET_USER:
      return {...state, user: action.payload};
    default: 
      return state;
  }
}

export default authReducer