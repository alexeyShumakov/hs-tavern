import axios from "axios";
import _ from "lodash";

import actionTypes from "../constants";

export function setCards(cards) {
  return {
    type: actionTypes.SET_CARDS,
    cards
  }
}

export function clearCards() {
  return {
    type: actionTypes.CLEAR_CARDS
  }
}

export function setCard(card) {
  return {
    type: actionTypes.SET_CARD,
    card
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
