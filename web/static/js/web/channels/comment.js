import * as actions from "../actions/index";
import store from "../store/store";
import socket from "../../socket";

export default (id) => {
  const channel = socket.channel(`comment:${id}`, {})
  channel.join()
  channel.on("like", payload => {
    switch(payload["entity_type"]) {
    case "desk":
      store.dispatch(actions.updateDeskComment(payload));

    case "card":
      store.dispatch(actions.updateCardComment(payload));
    default:
      console.log("ERR")
    }

  })
  return channel
}
