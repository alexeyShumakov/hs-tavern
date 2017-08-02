import axios from "../utils/axios";
import _ from "lodash";

export function ceFetchMentionSuggestions(name) {
  return(dispatch, getState) => {
    return axios.get("/ajax/users/search", {params: {name}})
      .then((resp)=>{
        dispatch(ceSetMentionSuggestions(resp.data));
      });
  };
}

export function ceSetMentionSuggestions(suggestions) {
  return {
    type: "COMMENT_EDITOR_SET_MENTION_SUGGESTIONS",
    suggestions
  };
}

export function ceFetchCardSuggestions(keyword) {
  return(dispatch, getState) => {
    return axios.get("/ajax/cards", {params: {keyword: keyword, per_page: 6}})
      .then((resp)=>{
        dispatch(ceSetCardSuggestions(resp.data.index));
      });
  };
}

export function ceSetCardSuggestions(suggestions) {
  return {
    type: "COMMENT_EDITOR_SET_CARD_SUGGESTIONS",
    suggestions
  };
}
