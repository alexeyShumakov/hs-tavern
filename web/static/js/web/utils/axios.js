import store from "../store/store.js";
import axios from "axios";

const token = store.getState().user.csrf_token;
export default axios.create({ headers: { 'X-CSRF-Token': token }});
