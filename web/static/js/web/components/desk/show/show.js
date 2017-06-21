import React from "react";
import Desk from "./desk";
import createDeskChannel from "../../../channels/desk";

export default class DeskShow extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.store);
    this.state = {channel: createDeskChannel(props.store.desks.show.id)}
  }

  componentWillUnmount() {
    this.state.channel.leave()
  }

  render() {
    let desk = this.props.store.desks.show;
    let { setDesk, setModal } = this.props.actions;
    return(
      <div>
        <Desk setModal={setModal}
          channel={this.state.channel}
          desk={desk}
          update={setDesk}
          isLogin={this.props.store.user.is_authenticated}
        />
      </div>
    )
  }
}
