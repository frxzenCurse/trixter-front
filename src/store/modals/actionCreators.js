const { OPEN_MODAL, CLOSE_MODAL } = require("./actions");


const openModal = () => ({
  type: OPEN_MODAL,
})

const closeModal = () => ({
  type: CLOSE_MODAL,
})

export { openModal, closeModal };