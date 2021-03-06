import axios from "../utils/axios";
import _ from "lodash";

import actionTypes from "../constants";


export function fetchAllCardComments(cardId) {
  return(dispatch, getState) => {
    return axios.get("/ajax/comments", {params: {entity_type: "card", entity_id: cardId}})
      .then((resp)=>{
      const card = getState().cards.show;
      const newCard = Object.assign({}, card, {comments: resp.data});
      dispatch(setCard(newCard));
    }, ()=> {
      console.log("err")
    })
  }
}

export function updateCardComment(comment) {
  return { type: "UPDATE_CARD_COMMENT", comment }
}

export function setCardComment(comment) {
  return {
    type: "SET_CARD_COMMENT",
    comment
  }
}
export function openCardsModal(card) {
  return(dispatch, getState) => {
    dispatch(setCardsModal(true));
  }
}

export function closeCardsModal(card) {
  return(dispatch, getState) => {
    dispatch(setCardsModal(false));
  }
}

export function openCardChannel(id) {
  return{
    type: "OPEN_CARD_CHANNEL",
    id
  }
}

export function closeCardChannel(id) {
  return{
    type: "CLOSE_CARD_CHANNEL",
    id
  }
}

export function setCardsModal(isOpenModal) {
  return {
    type: actionTypes.SET_CARDS_MODAL,
    isOpenModal
  }
}

export function setIsDirtyCardsFilters(isDirty) {
  return {
    type: actionTypes.SET_IS_DIRTY_CARD_FILTERS,
    isDirty
  }

}
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

export function pushCardsComment(comment) {
  return {
    type: "PUSH_CARDS_COMMENT",
    comment
  }
}

export function cardsExecChannel(id) {
  return(dispatch, getState) => {
    dispatch(openCardChannel(id));
    getState().cards.channel.on("create_comment", payload => {
      dispatch(pushCardsComment(payload["comment"]))
      const card = getState().cards.show;
      const newCard = Object.assign({}, card, {comments_count: payload["comments_count"]})
      dispatch(setCard(newCard))
    })
    getState().cards.channel.on("like", payload => {
      const card = getState().cards.show
      const newCard = Object.assign({}, card, payload)
      dispatch(setCard(newCard));
    })
  }
}

export function fetchCard(id) {
  return(dispatch, getState) => {
    dispatch(openCardChannel(id));
    getState().cards.channel.on("create_comment", payload => {
      dispatch(pushCardsComment(payload["comment"]))
      const card = getState().cards.show;
      const newCard = Object.assign({}, card, {comments_count: payload["comments_count"]})
      dispatch(setCard(newCard))
    })
    getState().cards.channel.on("like", payload => {
      const card = getState().cards.show
      const newCard = Object.assign({}, card, payload)
      dispatch(setCard(newCard));
    })
    return axios.get(`/ajax/cards/${id}`).then((response) => {
      dispatch(setCard(response.data));
    })
  }
}

export function pushCards() {
  return(dispatch, getState) => {
    const filters = getState().cards.filters;
    return axios.get('/ajax/cards', {params: createParams(filters)}).then((response) => {
      const cards = getState().cards.index.concat(response.data.index);
      dispatch(setCards(cards));
      const newFilters = Object.assign(
        {}, filters,
        {pagination: response.data.filters.pagination})
      dispatch(setCardsFilters(newFilters));
    })
  }

}
export function fetchCards(force = false) {
  return(dispatch, getState) => {
    const filters = getState().cards.filters;
    if(_.isEmpty(getState().cards.index) || force) {
      return axios.get('/ajax/cards', {params: createParams(filters)}).then((response) => {
        dispatch(setCards(response.data.index));
        const newFilters = Object.assign(
          {}, filters,
          {pagination: response.data.filters.pagination})
        dispatch(setCardsFilters(newFilters));
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
  if(filters.rarity)
    f["rarity"] = filters.rarity;
  if(filters.player_class)
    f["class"] = filters.player_class;
  if(filters.race)
    f["race"] = filters.race;
  if(filters.set)
    f["set"] = filters.set;
  if(filters.cost)
    f["cost"] = filters.cost.join(";")
  if(filters.health)
    f["health"] = filters.health.join(";")
  if(filters.attack)
    f["attack"] = filters.attack.join(";")
  if(filters.collectible == false)
    f["collectible"] = filters.collectible
  if(filters.standard == false)
    f["standard"] = filters.standard
  return f;
}
