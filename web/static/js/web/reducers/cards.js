import actionTypes from '../constants';
const defaultState = {
  show: {},
  index: [],
  filters: {
    pagination: {
      page: 1,
      total_pages: 2
    }
  }
}
export default (state = {}, action) => {
  switch (action.type) {

    case actionTypes.SET_CARDS_FILTERS:
      return Object.assign({}, state, {filters: action.filters})

    case actionTypes.CLEAR_CARD:
    case actionTypes.CLEAR_CARDS:
      return Object.assign({}, defaultState)

    case actionTypes.SET_CARD:
      return Object.assign({}, state, {show: action.card})

    case actionTypes.SET_CARDS:
      return Object.assign({}, state, {index: state.index.concat(action.cards)})

    default:
      return state;
  }
}
