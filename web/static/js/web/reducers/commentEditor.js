import _ from "lodash";
const defaultState = {
  mentionSuggestions: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "COMMENT_EDITOR_SET_MENTION_SUGGESTIONS":
      return Object.assign({}, state, {mentionSuggestions: action.suggestions});

    default:
      return state;
  }
}
