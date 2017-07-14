import axios from "../utils/axios";
import _ from "lodash";

export function ceFetchMentionSuggestions(name) {
  return(dispatch, getState) => {
    return axios.get("/api/users/search", {params: {name}})
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
