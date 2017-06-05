import { combineReducers } from 'redux'
import header from "./header";
import modal from "./modal";
import cards from "./cards";
import user from "./user";
import builder from "./builder";

export default combineReducers({
  header, modal, cards, user, builder
})
