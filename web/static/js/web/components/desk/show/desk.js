import React from "react";
import Curve from "../../builder/costCurve";
import DeskCard from "./deskCard";
import Counter from "../counter";
import socket from "../../../../socket";


export default class Desk extends React.Component {
  constructor(props) {
    super(props);
    const {desk, update} = props;
    const channel = socket.channel(`desk:${desk.id}`, {})
    channel.join()
    channel.on("like", payload => {
      update(Object.assign({}, desk, payload));
    })
    this.state = {channel}
  }
  render() {
    const {desk, isLogin, setModal} = this.props;
    const cards = desk.cards.map((deskCard)=>{
      let card = deskCard.card;
      card["count"] = deskCard.count;
      return card
    })
    return(
      <div>
        <div className="columns">
          <div className="column is-three-quarters">
            <h3 className="title is-4">{desk.title}, {desk.player_class}</h3>

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
            <div className="box">
              {desk.description}
            </div>
          </div>
          <div className="column">
            <div className="box">
              <Curve cards={cards} />
            </div>
            <div className="box">
                {cards.map((card)=>{
                  return <DeskCard key={card.id} card={card} />
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
