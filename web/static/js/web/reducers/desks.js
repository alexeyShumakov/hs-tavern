import actionTypes from '../constants';
const init = {
  index: [],
  isOpenModal: false,
  show: {},
  filters: {
    page: 1,
    total_pages: 2,
    keyword: "",
    player_class: "All",
    popularity: "new"
  }
}

let desks, desk, comments;
export default (state = init, action) => {
  switch (action.type) {
    case "SET_DESK_FILTERS":
      return Object.assign({}, state, {filters: action.filters})

    case "SET_DESK_MODAL":
      return Object.assign({}, state, {isOpenModal: action.isOpen})

    case "SET_DESK":
      return Object.assign({}, state, {show: action.desk})
    case "UPDATE_DESK":
      desk = Object.assign({}, state.show, action.desk)
      return Object.assign({}, state, {show: desk})

    case "UPDATE_DESK_COMMENT":
      comments = state.show.comments.map((comment)=>{
        if(comment.id != action.comment.id) {
          return comment
        } else {
          return Object.assign({}, comment, action.comment)
        }
      })
      desk = Object.assign({}, state.show, {comments})
      return Object.assign({}, state, {show: desk})

    case "PUSH_DESK_COMMENT":
      comments = [...state.show.comments, action.comment]
      desk = Object.assign({}, state.show, {comments})
      return Object.assign({}, state, {show: desk})

    case "UPDATE_INDEX_DESK":
      desks = state.index.map((desk)=>{
        if(desk.id != action.desk.id)
          return desk
        return Object.assign({}, desk, action.desk)
      })
      return Object.assign({}, state, {index: desks})

    case "CLEAR_DESKS":
      state.index.forEach((desk)=> { desk.channel.leave() })
      return Object.assign({}, init)

    case "SET_DESKS":
      return Object.assign({}, state, {index: action.desks})
    default:
      return state;
  }
}
