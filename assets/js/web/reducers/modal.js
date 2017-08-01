import actionTypes from '../constants';
const init = { isOpen: false }
export default (state = init, action) => {
  switch (action.type) {
    case actionTypes.SET_MODAL:
      return Object.assign({}, state, { isOpen: action.isOpen});
    default:
      return state;
  }
}
