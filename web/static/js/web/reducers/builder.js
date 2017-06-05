const init = {
  desk: {
    player_class: ""
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

export default (state = init, action) => {
  switch (action.type) {
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
