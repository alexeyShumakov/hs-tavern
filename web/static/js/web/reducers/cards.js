import actionTypes from '../constants';
export default (state = {}, action) => {
  switch (action.type) {

    case actionTypes.CLEAR_CARDS:
      return Object.assign({}, state, {index: []})

    case actionTypes.SET_CARDS:
      return Object.assign({}, state, {index: action.cards})

    default:
      return state;
  }
}
