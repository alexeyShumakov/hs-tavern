import _ from "lodash";
const defaultState = {
  mentionSuggestions: [],
  cardSuggestions: [],
  showToolbar: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "COMMENT_EDITOR_SET_MENTION_SUGGESTIONS":
      return Object.assign({}, state, {mentionSuggestions: action.suggestions});

    case "COMMENT_EDITOR_SET_CARD_SUGGESTIONS":
      return Object.assign({}, state, {cardSuggestions: action.suggestions});
    default:
      return state;
  }
}
