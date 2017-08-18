import store from "../store/store";
import axios from "axios";

const csrfToken = store.getState().user.csrf_token;
const token = store.getState().user.token;
export default axios.create({ headers: { 'X-CSRF-Token': csrfToken, 'Authorization': token }});
