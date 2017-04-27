import axios from "axios";
import _ from "lodash";

import actionTypes from "../constants";

export function setCard(card) {
  return {
    type: actionTypes.SET_CARD,
    card
  }
}

export function setCards(cards) {
  return {
    type: actionTypes.SET_CARDS,
    cards
  }
}

export function clearCard() {
  return {
    type: actionTypes.CLEAR_CARD
  }
}

export function clearCards() {
  return {
    type: actionTypes.CLEAR_CARDS
  }
}

export function fetchCard(id) {
  return(dispatch, getState) => {
    if(_.isEmpty(getState().cards.show)) {
      return axios.get(`/api/cards/${id}`).then((response) => {
        dispatch(setCard(response.data));
      })
    }
  }
}

export function fetchCards() {
  return(dispatch, getState) => {
    if(_.isEmpty(getState().cards.index)) {
      return axios.get('/api/cards').then((response) => {
        dispatch(setCards(response.data));
      })
    }
  }
}
