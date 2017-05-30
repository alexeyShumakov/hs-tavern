import React from "react";
import Comment from "../comment/comment";
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
    const isLogin =  this.props.store.user.is_authenticated;
    const card = this.props.store.cards.show;
    const comments = card.comments.map((c)=> {
      return(<Comment
        key={c.id}
        comment={c}
        store={this.props.store}
        actions={this.props.actions}
        />)
    })
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
        {comments}
        {isLogin ?
          <div className="media">
            <div className="media-left">
              <p className="image is-48x48">
                <img src={this.props.store.user.avatar}/>
              </p>
            </div>

            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    onChange={(e) => {this.setState({comment: e.target.value})}}
                    value={this.state.comment} id="" name="" cols="30" rows="10">
                  </textarea>
                </p>
              </div>

              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button"
                      onClick={()=> {
                        this.setState({comment: ""});
                        this.props.store.cards.channel
                          .push("create_comment",{card_id: card.id, body: this.state.comment} )
                      }}
                    >create comment</button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          :
            <article className="message">
              <div className="message-body">
                Please, Sing in to comment
              </div>
            </article>
        }
      </div>
    )
  }
}
