import axios from "../utils/axios";
import _ from "lodash";

export function clearDesks() {
  return { type: "CLEAR_DESKS" }
}

export function updateIndexDesk(desk) {
  return { type: "UPDATE_INDEX_DESK", desk }
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
