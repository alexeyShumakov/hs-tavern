import _ from "lodash";

const init = {
  errors: {},
  isValid: true,
  desk: {
    player_class: "",
    title: "",
    description: "",
    standard: true,
    cards: []
  },
  cards: [],
  filters: {
    player_class: "",
    set: "All",
    keyword: "",
    cost: {min:0, max:7},
    collectible: true,
    pagination: {
      page: 1,
      total_pages: 2,
      page_size: 6
    }
  }
}

let newDesk, cards, newCards, newState, card, newCard, index;
let removeCard = (cards, card) => {
  return cards.filter((desk_card) => {return desk_card.card_id !== card.card_id })
}
export default (state = init, action) => {
  switch (action.type) {
    case "BUILDER_VALIDATE_DESK":
      let errors = {}
      if(_.isEmpty(state.desk.description))
        errors["description"] = "Description is required."
      if(_.isEmpty(state.desk.title))
        errors["title"] = "Title is required."
      if (_.sumBy(state.desk.cards, 'count') < 30)
        errors["count"] = "We need more cards!"
      return Object.assign({}, state, {errors, isValid: _.isEmpty(errors)})

    case "BUILDER_UPDATE_DESK":
      return Object.assign({}, state, {desk: action.desk})

    case "BUILDER_REMOVE_CARD":
      newDesk = Object.assign({}, state.desk,
        {cards: removeCard(state.desk.cards, action.card)})
      return Object.assign({}, state, {desk: newDesk})

    case "BUILDER_UPDATE_DESK_CARD":
      cards  = state.desk.cards.map((desk_card) => {
        return desk_card.card_id == action.card.card_id ? action.card : desk_card
      })
      newDesk = Object.assign({}, state.desk, {cards: cards})
      return Object.assign({}, state, {desk: newDesk})

    case "BUILDER_ADD_CARD_TO_DESK":
      cards = [...state.desk.cards, action.card]
      newDesk = Object.assign({}, state.desk, {cards: cards})
      return Object.assign({}, state, {desk: newDesk})

    case "BUILDER_CLEAR":
      return Object.assign({}, init);

    case "SET_BUILDER_CARDS":
      return Object.assign({}, state, {cards: action.cards});

    case "SET_BUILDER_DESK":
      return Object.assign({}, state, {desk: action.desk});

    case "SET_BUILDER_FILTERS":
      return Object.assign({}, state, {filters: action.filters});

    default:
      return state;
  }
}
