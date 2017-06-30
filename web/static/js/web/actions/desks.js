import axios from "../utils/axios";
import socket from "../../socket";
import store from "../store/store";
import createDeskChannel from "../channels/desk";

export function deleteDesk(deskId) {
  return(dispatch, getState) => {
    return axios.delete(`/desks/${deskId}`)
  }
}
export function likeDeskComment(deskId) {
  return(dispatch, getState) => {
    return axios.post("/likes", {
      like: {
        entity_type: "comment",
        entity_id: deskId
      }
    }).then((resp)=>{
      dispatch(updateDeskComment(resp.data));
    }, ()=> {
      console.log("err")
    })

  }
}

export function updateDeskComment(comment) {
  return { type: "UPDATE_DESK_COMMENT", comment }
}

export function pushDeskComment(comment) {
  return { type: "PUSH_DESK_COMMENT", comment }
}

export function fetchAllDeskComments(deskId) {
  return(dispatch, getState) => {
    return axios.get("/comments", {params: {entity_type: "desk", entity_id: deskId}})
      .then((resp)=>{
      let desk = getState().desks.show;
      desk = Object.assign({}, desk, {comments: resp.data});
      dispatch(setDesk(desk));
    }, ()=> {
      console.log("err")
    })
  }
}
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

export function initialFetchDesk(id) {
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
export function fetchDesk(id) {
  return(dispatch, getState) => {
    return axios.get(`/api/desks/${id}`).then((response) => {
      dispatch(setDesk(response.data))
    })
  }
}

export function initialFetchDesks() {
  return(dispatch, getState) => {
    let desks = getState().desks.index;
    let filters = getState().desks.filters;
    if(_.isEmpty(desks)) {
      return axios.get('/api/desks', {params: filters}).then((response) => {
        desks = response.data.desks.map((desk)=>{
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

export function setDeskFilters(filters) {
  return {
    type: "SET_DESK_FILTERS",
    filters
  }
}
export function fetchDesks(push = false) {
  return(dispatch, getState) => {
      let currentDesks = getState().desks.index;
      let filters = getState().desks.filters;
      return axios.get('/api/desks', {params: filters}).then((response) => {
        let desks = response.data.desks.map((desk)=>{
          return Object.assign({}, desk, {channel: createDeskChannel(desk.id)})
        })
        if(push)
          desks = currentDesks.concat(desks);
        dispatch(setDesks(desks));
        dispatch(setDeskFilters(response.data.filters))
      })
    }
}

export function setDesks(desks) {
  return {
    type: "SET_DESKS",
    desks
  }
}
