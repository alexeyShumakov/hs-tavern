import actionTypes from '../constants';
const init = { index: [] }

let desks;
export default (state = init, action) => {
  switch (action.type) {
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
