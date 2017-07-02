import React from "react";
import Curve from "../../builder/costCurve";
import DeskCard from "./deskCard";
import Counter from "../counter";
import socket from "../../../../socket";
import CommentsList from "../../comment/commentsList";
import { Link, withRouter } from 'react-router-dom';
import axios from "../../../utils/axios";
import _ from "lodash";


export default class Desk extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const {deleteCallback, route, store, actions, channel, desk, isLogin, setModal} = this.props;
    const {cards} = desk;
    let sortedCards = _.sortBy(cards, ["cost", "title"])

    const DeleteButton = withRouter(({history})=>{
      return <a className="button is-fullwidth is-danger"
        onClick={()=>{
          deleteCallback().then(()=>{
            history.push("/my_desks")
          })
        }}
      >delete</a>
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
              { store.user.id == desk.user.id &&
                <div>
                  <hr/>
                  <div className="field">
                    <Link to={`/desks/${desk.id}/edit`} className="button is-fullwidth is-warning">edit</Link>
                  </div>
                  <div className="field">
                    <DeleteButton />
                  </div>
                </div>
              }
            </div>
            <div className="box">
                {sortedCards.map((card)=>{
                  return <DeskCard key={card.id} card={card} />
                })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
