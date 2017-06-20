import React from "react";
import socket from "../../../../socket";
import Counter from "../counter";

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

  render() {
    const {fetchDesk, desk, isLogin, setModal, setDeskModal } = this.props;
    return(
      <div className="media" onClick={()=>{
        fetchDesk()
        window.history.pushState(null, null, `/desks/${desk.id}`);
      }}>
        <div className="media-left">
          {desk.player_class}
        </div>
        <div className="media-content">
          {desk.title} by {desk.user.name}

          <Counter
            likesCount={desk.likes_count}
            commentsCount={desk.comments_count}
            likeMe={desk.like_me}
            likeCallback={(e)=>{
              e.stopPropagation();
              if(isLogin) {
                this.state.channel.push("like", {desk_id: desk.id})
              } else {
                setModal(true);
              }
            }}
          />
        </div>
      </div>
    )
  }
}
