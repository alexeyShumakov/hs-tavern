import actionTypes from '../constants';
export default (state = {}, action) => {
  switch (action.type) {

    case actionTypes.CLEAR_CARD:
      return Object.assign({}, state, {show: {}})

    case actionTypes.CLEAR_CARDS:
      return Object.assign({}, state, {index: []})

    case actionTypes.SET_CARD:
      return Object.assign({}, state, {show: action.card})

    case actionTypes.SET_CARDS:
      return Object.assign({}, state, {index: action.cards})

    default:
      return state;
  }
}
