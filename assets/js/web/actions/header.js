import actionTypes from "../constants";

export function setName(name) {
  return({
    type: actionTypes.SET_NAME,
    name
  })
}
