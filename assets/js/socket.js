import {Socket} from "phoenix";
import store from "./web/store/store";

let socket = new Socket("/socket", { params: {guardian_token: store.getState().user.token}});
socket.connect();
export default socket;
