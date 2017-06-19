import actionTypes from '../constants';
const init = {
  index: [],
  isOpenModal: false,
  show: {}
}

let desks;
export default (state = init, action) => {
  switch (action.type) {
    case "SET_DESK_MODAL":
      return Object.assign({}, state, {isOpenModal: action.isOpen})

    case "SET_DESK":
      return Object.assign({}, state, {show: action.desk})

    case "UPDATE_INDEX_DESK":
      desks = state.index.map((desk)=>{
        if(desk.id != action.desk.id)
          return desk
        return Object.assign({}, desk, action.desk)
      })
      return Object.assign({}, state, {index: desks})

    case "CLEAR_DESKS":
      return Object.assign({}, init)

    case "SET_DESKS":
      return Object.assign({}, state, {index: action.desks})
    default:
      return state;
  }
}
