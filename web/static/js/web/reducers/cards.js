import _ from "lodash";
import socket from "../../socket";
import actionTypes from '../constants';
const defaultState = {
  isOpenModal: false,
  show: {
    comments:[]
  },
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

let channel, comments, newState, arrId, show;
export default (state = {}, action) => {
  switch (action.type) {
    case "SET_CARD_COMMENT":
      let newComments = state.show.comments.slice();
      state.show.comments.find((element, id)=> {
        if(action.comment.id == element.id) {
          let newComment = Object.assign({}, element, action.comment)
          newComments[id] = newComment;
          show = Object.assign({}, state.show, {comments: newComments})
        }
      })
      return Object.assign({}, state, {show: show})

    case "PUSH_CARDS_COMMENT":
      comments = state.show.comments;
      let newShow = Object.assign({}, state.show, {comments: [...comments, action.comment]})
      console.log(newShow)
      return Object.assign({}, state, {show: newShow});

    case "OPEN_CARD_CHANNEL":
      channel = socket.channel(`card:${action.id}`)
      channel.join()
      return Object.assign({}, state, {channel})

    case "CLOSE_CARD_CHANNEL":
      channel = socket.channel(`card:${action.id}`)
      channel.leave()
      return Object.assign({}, state, {channel})

    case actionTypes.SET_CARDS_MODAL:
      return Object.assign({}, state, {isOpenModal: action.isOpenModal})

    case actionTypes.SET_CARDS_FILTERS:
      return Object.assign({}, state, {filters: action.filters})

    case actionTypes.CLEAR_CARD:
      return Object.assign({}, state, {show: {}})

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
