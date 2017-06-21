import axios from "../utils/axios";
import socket from "../../socket";
import store from "../store/store";
import createDeskChannel from "../channels/desk";

export function clearDesks() {
  return { type: "CLEAR_DESKS" }
}

export function setDeskModal(isOpen) {
  return { type: "SET_DESK_MODAL", isOpen}
}

export function setDesk(desk) {
  return { type: "SET_DESK", desk }
}

export function updateIndexDesk(desk) {
  return { type: "UPDATE_INDEX_DESK", desk }
}

export function updateDesk(desk) {
  return { type: "UPDATE_DESK", desk }
}

export function fetchDesk(id) {
  return(dispatch, getState) => {
    if(_.isEmpty(getState().desks.show)) {
      return axios.get(`/api/desks/${id}`).then((response) => {
        dispatch(setDesk(response.data))
      })
    } else {
      return Promise.resolve();
    }
  }
}

export function fetchDesks() {
  return(dispatch, getState) => {
    let desks = getState().desks.index;
    if(_.isEmpty(desks)) {
      return axios.get('/api/desks').then((response) => {
        desks = response.data.map((desk)=>{
          return Object.assign({}, desk, {channel: createDeskChannel(desk.id)})
        })
        dispatch(setDesks(desks))
      })
    } else {
        desks = desks.map((desk)=>{
          return Object.assign({}, desk, {channel: createDeskChannel(desk.id)})
        })
        dispatch(setDesks(desks))
      return Promise.resolve();
    }
  }
}

export function setDesks(desks) {
  return {
    type: "SET_DESKS",
    desks
  }
}
