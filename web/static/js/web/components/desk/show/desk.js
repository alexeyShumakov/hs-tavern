import React from "react";
import Curve from "../../builder/costCurve";
import DeskCard from "./deskCard";
import Counter from "../counter";
import socket from "../../../../socket";
import CommentsList from "../../comment/commentsList";


export default class Desk extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {store, actions, channel, desk, isLogin, setModal} = this.props;
    const cards = desk.cards.map((deskCard)=>{
      let card = deskCard.card;
      card["count"] = deskCard.count;
      return card
    })
    return(
      <div>
        <div className="columns">
          <div className="column is-three-quarters">
            <div className="media">
              <div className="media-left">
                <p className="image is-48x48">
                  <img src={`/images/icons/icon-${desk.player_class.toLowerCase()}.png`} alt=""/>
                </p>
              </div>
              <div className="media-content">
                <h3 className="title is-4">{desk.title}</h3>
                <h4 className="subtitle is-6">by {desk.user.name}</h4>
              </div>
              <div className="media-right">
                <Counter
                  likesCount={desk.likes_count}
                  commentsCount={desk.comments_count}
                  likeMe={desk.like_me}
                  likeCallback={(e)=>{
                    e.stopPropagation();
                    if(isLogin) {
                      channel.push("like", {desk_id: desk.id})
                    } else {
                      setModal(true);
                    }
                  }}
                />
              </div>
            </div>
            <hr/>
            <div className="box">
              <div className="content">
                {desk.description}
              </div>
            </div>

            <div className="box">

            <CommentsList
              likeCallback={(id)=>{ actions.likeDeskComment(id) }}
              openAuthModal={()=>{ actions.setModal(true) }}
              fetchComments={()=>{ actions.fetchAllDeskComments(desk.id) }}
              comments={desk.comments}
              currentUser={store.user}
              totalCount={desk.comments_count}
              createCallback={(body)=>{
                channel.push("comment",{desk_id: desk.id, body: body} )
              }}
              />
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
