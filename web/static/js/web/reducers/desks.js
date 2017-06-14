import actionTypes from '../constants';
const init = { index: [] }

export default (state = init, action) => {
  switch (action.type) {
    case "CLEAR_DESKS":
      return Object.assign({}, init)

    case "SET_DESKS":
      return Object.assign({}, state, {index: action.desks})
    default:
      return state;
  }
}
