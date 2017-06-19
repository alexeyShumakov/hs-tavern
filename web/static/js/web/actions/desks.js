import axios from "../utils/axios";
import _ from "lodash";

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
    if(_.isEmpty(getState().desks.index)) {
      return axios.get('/api/desks').then((response) => {
        dispatch(setDesks(response.data))
      })
    } else {
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
