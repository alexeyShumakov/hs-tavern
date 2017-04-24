import actionTypes from '../constants';
const init = { name: "world" }
export default (state = init, action) => {
  switch (action.type) {
    case actionTypes.SET_NAME:
      return Object.assign({}, state, { name: action.name});
    default:
      return state;
  }
}
