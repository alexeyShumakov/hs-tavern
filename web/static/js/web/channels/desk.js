import * as actions from "../actions/index";
import store from "../store/store";
import socket from "../../socket";

export default (id) => {
  const channel = socket.channel(`desk:${id}`, {})
  channel.join()
  channel.on("like", payload => {
    store.dispatch(actions.updateIndexDesk(payload));
    if(store.getState().desks.show.id == payload.id)
      store.dispatch(actions.updateDesk(payload));
  })

  channel.on("comment", payload => {
    store.dispatch(actions.updateDesk({comments_count: payload.comments_count}));
    store.dispatch(actions.pushDeskComment(payload.comment));
  })
  return channel
}
