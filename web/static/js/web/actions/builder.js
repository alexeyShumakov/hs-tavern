import axios from "../utils/axios";
import _ from "lodash";

export function builderSaveDesk() {
  return(dispatch, getState) => {
    dispatch(builderValidateDesk());
  }
}

export function builderValidateDesk() {
  return {
    type: "BUILDER_VALIDATE_DESK"
  }
}

export function builderRemoveCard(card) {
  return {
    type: "BUILDER_REMOVE_CARD",
    card
  }
}
export function builderAddCardToDesk(card) {
  return {
    type: "BUILDER_ADD_CARD_TO_DESK",
    card
  }
}

export function builderUpdateDeskCard(card) {
  return {
    type: "BUILDER_UPDATE_DESK_CARD",
    card
  }
}

export function builderUpdateDesk(desk) {
  return {
    type: "BUILDER_UPDATE_DESK",
    desk
  }
}

export function builderFetchCards() {
  return(dispatch, getState) => {
    let params = createParams(getState().builder.filters);
    return axios.get("/api/cards", {params}).then((resp) => {
      dispatch(builderSetFilters(resp.data.filters));
      dispatch(builderSetCards(resp.data.index));
    }, ()=> {
    })
  }
}

export function builderClear() {
  return { type: "BUILDER_CLEAR" }
}

export function builderSetCards(cards) {
  return {
    type: "SET_BUILDER_CARDS",
    cards
  }
}
export function builderSetDesk(desk) {
  return {
    type: "SET_BUILDER_DESK",
    desk
  }
}

export function builderSetFilters(filters) {
  return {
    type: "SET_BUILDER_FILTERS",
    filters
  }
}

function createParams(filters) {
  let f = {}
  f["page"] = filters.pagination.page;
  f["page_size"] = filters.pagination.page_size;
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
    f["cost"] = `${filters.cost.min};${filters.cost.max}`;
  if(filters.collectible == false)
    f["collectible"] = filters.collectible
  if(filters.standard == false)
    f["standard"] = filters.standard
  return f;
}
