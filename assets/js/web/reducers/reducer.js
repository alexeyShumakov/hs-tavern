import { combineReducers } from 'redux';
import header from "./header";
import modal from "./modal";
import cards from "./cards";
import user from "./user";
import builder from "./builder";
import desks from "./desks";
import commentEditor from "./commentEditor";

export default combineReducers({
  header, modal, cards, user, builder, desks, commentEditor
});
