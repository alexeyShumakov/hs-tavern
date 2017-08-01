import actionTypes from "../constants";

export function setModal(isOpen) {
  return({
    type: actionTypes.SET_MODAL,
    isOpen
  })
}
