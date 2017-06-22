import React from "react";
import CommentsList from "../comment/commentsList";
import _ from "lodash";

export default class CardContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {comment: ""};
  }

  componentWillUnmount() {
    let {clearCard, closeCardChannel} = this.props.actions;
    closeCardChannel(this.props.store.cards.show.slug);
    clearCard();
  }

  render() {
    const {store, actions} = this.props;
    const isLogin =  store.user.is_authenticated;
    const card = store.cards.show;

    return(
      <div className="box">
        <h2 className="title is-3">{card.title}</h2>
        <div className="media">
          <div className="media-left">
            <p className="image">
              <img src={card.img} alt=""/>
            </p>
          </div>
          <div className="media-content">
            <div className="content">
              <h4>Card text</h4>

              <p> {card.text} </p>
              <h4>Flavor</h4>
              <p>{card.flavor}</p>
              <hr/>
              <ul>
                <li><b>Set: </b> {card.card_set}</li>
                <li><b>Type: </b> {card.type}</li>
                <li><b>Faction: </b> {card.faction}</li>
                <li><b>Rarity: </b>{card.rarity}</li>
                <li><b>Cost:</b> {card.cost}</li>
                {_.isInteger(card.attack) &&
                  <li><b>Attack: </b> {card.attack}</li>
                }
                {card.health &&
                  <li><b>Health: </b> {card.health}</li>
                }
                <li><b>Artist: </b>{card.artist}</li>
                {card.race &&
                  <li><b>Race: </b> {card.race}</li>
                }

                {card.player_class &&
                  <li><b>Class: </b> {card.player_class}</li>
                }
                <li>{card.collectible ? "collectible" : "not collectible"}</li>
                <li>{card.elite ? "elite" : "not elite"}</li>
              </ul>
            </div>
          </div>
        </div>

        <nav className="level">
          <div className="level-left">
            <a className="level-item">
              {card.likes_count}
              <span className="icon"
                onClick={()=>{
                  if(store.user.is_authenticated) {
                    actions.likeCard(card.id);
                  } else {
                    actions.setModal(true);
                  }
                }}
              ><i className={`fa fa-heart${card.like_me ? "" : "-o"}`}></i></span>
            </a>
            <a className="level-item">
              {card.comments_count}
              <span className="icon"><i className="fa fa-comment-o"></i></span>
            </a>
          </div>
        </nav>
        <hr/>
        <CommentsList
          likeCallback={(id)=>{ actions.likeCardComment(id) }}
          openAuthModal={()=>{ actions.setModal(true) }}
          fetchComments={()=>{ actions.fetchAllCardComments(card.id) }}
          comments={card.comments}
          currentUser={store.user}
          totalCount={card.comments_count}
          createCallback={(body)=>{
            store.cards.channel
              .push("create_comment",{card_id: card.id, body: body} )
          }}
          />
      </div>
    )
  }
}
