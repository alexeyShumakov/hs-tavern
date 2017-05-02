import axios from "axios";
import _ from "lodash";

import actionTypes from "../constants";

export function setCardsFilters(filters) {
  return {
    type: actionTypes.SET_CARDS_FILTERS,
    filters
  }
}

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

export function pushCards() {
  return(dispatch, getState) => {
    const filters = getState().cards.filters;
    return axios.get('/api/cards', {params: createParams(filters)}).then((response) => {
      const cards = getState().cards.index.concat(response.data.index);
      dispatch(setCards(cards));
      dispatch(setCardsFilters(response.data.filters));
    })
  }

}
export function fetchCards(force = false) {
  return(dispatch, getState) => {
    const filters = getState().cards.filters;
    if(_.isEmpty(getState().cards.index) || force) {
      return axios.get('/api/cards', {params: createParams(filters)}).then((response) => {
        dispatch(setCards(response.data.index));
        dispatch(setCardsFilters(response.data.filters));
      })
    } else {
      return Promise.resolve();
    }
  }
}

function createParams(filters) {
  let f = {}
  f["page"] = filters.pagination.page;
  f["keyword"] = filters.keyword || ""
  if(filters.player_class)
    f["class"] = filters.player_class;
  if(filters.cost)
    f["cost"] = `${filters.cost.min};${filters.cost.max}`
  if(filters.collectible == false)
    f["collectible"] = filters.collectible
  return f;
}
