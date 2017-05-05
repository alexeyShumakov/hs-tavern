import actionTypes from '../constants';
const defaultState = {
  show: {},
  index: [],
  isDirtyFilters: false,
  filters: {
    rarity: null,
    player_class: "All",
    race: "All",
    set: "All",
    keyword: "",
    cost: [0,7],
    attack: [0,7],
    health: [0,7],
    collectible: true,
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
      return Object.assign({}, state, {index: action.cards})

    case actionTypes.SET_IS_DIRTY_CARD_FILTERS:
      return Object.assign({}, state, {isDirtyFilters: action.isDirty})

    default:
      return state;
  }
}
