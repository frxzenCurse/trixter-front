const { OPEN_MODAL, CLOSE_MODAL } = require("./actions")

const initialState = {
  isOpen: false
}

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { isOpen: true }
    case CLOSE_MODAL:
      return { isOpen: false }
    default: 
      return state;
  }
}

export default modalsReducer