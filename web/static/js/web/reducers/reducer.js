import { combineReducers } from 'redux'
import header from "./header";
import modal from "./modal";
import cards from "./cards";

export default combineReducers({
  header, modal, cards
})
