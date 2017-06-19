import React from "react";
import socket from "../../../../socket";

export default class Desk extends React.Component {
  constructor(props) {
    super(props);
    const {desk, update} = props;
    const channel = socket.channel(`desk:${desk.id}`, {})
    channel.join()
    channel.on("like", payload => {
      update(payload);
    })
    this.state = {channel}
  }

  componentWillUnmount() {
    this.state.channel.leave()
  }

  render() {
    const { desk, isLogin, setModal } = this.props;
    return(
      <div className="media">
        <div className="media-left">
          {desk.player_class}
        </div>
        <div className="media-content">
          {desk.title} by {desk.user.name}
          <div className="level">
            <div className="level-left">
              <a className="level-item">
                <span>{desk.likes_count}</span>
                <span className="icon is-small" onClick={()=> {
                  if(isLogin) {
                    this.state.channel.push("like", {desk_id: desk.id})
                  } else {
                    setModal(true);
                  }
                  }}>
                  <i className={`fa fa-heart${desk.like_me ? "" : "-o"}`}></i>
                </span>
              </a>
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-comment"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
