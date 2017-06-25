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
    let newDesk = {id: payload.comment.entity_id, comments_count: payload.comments_count}
    store.dispatch(actions.updateIndexDesk(newDesk))
    store.dispatch(actions.updateDesk(newDesk));
    store.dispatch(actions.pushDeskComment(payload.comment));
  })
  return channel
}
