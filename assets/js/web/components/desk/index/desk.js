import React from "react";
import socket from "../../../../socket";
import Counter from "../counter";
import _ from "lodash";

export default class Desk extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {fetchDesk, desk, isLogin, setModal, setDeskModal } = this.props;
    return(
      <div className="media index-desk" onClick={()=>{
        fetchDesk()
        window.history.pushState(null, null, `/desks/${desk.id}`);
      }}>
        <div className="media-left">
          <p className="image is-48x48">
            <img src={`/images/icons/icon-${desk.player_class.toLowerCase()}.png`} alt=""/>
          </p>
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
                desk.channel.push("like", {desk_id: desk.id})
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
