import React from "react";
import Time from "../../utils/time";

function convert(t) {
  time(t);
}
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
      return(
        <div key={c.id} className="media">
          <div className="media-left">
            <p className="image is-48x48">
              <img src={c.user.avatar}/>
            </p>
          </div>

          <div className="media-content">
            <strong>{c.user.name}</strong> <small><Time time={c.inserted_at}/></small>
            <div className="content"> {c.body} </div>
          </div>
        </div>
      )
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
                <li>{card.card_set}</li>
                <li>{card.type}</li>
                <li>{card.faction}</li>
                <li>{card.rarity}</li>
                <li>cost: {card.cost}</li>
                <li>attack: {card.attack}</li>
                <li>health: {card.health}</li>
                <li>{card.artist}</li>
                <li>{card.collectible ? "collectible" : "not collectible"}</li>
                <li>{card.elite ? "elite" : "not elite"}</li>
                <li>{card.race}</li>
                <li>{card.player_class}</li>
              </ul>
            </div>
          </div>
        </div>
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
        {comments}
      </div>
    )
  }
}
