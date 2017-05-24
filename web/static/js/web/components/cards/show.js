import React from "react";

export default class CardsShow extends React.Component {
  constructor(props) {
    super(props);
    const { cardId } = props.route.match.params;
    const { fetchCard } = props.actions;
    this.state = {comment: ""};
    fetchCard(cardId);
  }

  componentWillUnmount() {
    let {clearCard, closeCardChannel} = this.props.actions;
    closeCardChannel(this.props.route.match.params);
    clearCard();
  }

  render() {
    const card = this.props.store.cards.show;
    const comments = card.comments.map((c)=> {
      return <div key={c.id} className="box">{c.body}</div>
    })
    return(
      <div>
        <img src={card.img} alt=""/>
        <textarea
          className="textarea"
          onChange={(e) => {this.setState({comment: e.target.value})}}
          value={this.state.comment} id="" name="" cols="30" rows="10">
        </textarea>
        <button className="button"
          onClick={()=> {
            this.setState({comment: ""});
            this.props.store.cards.channel
              .push("create_comment",{card_id: card.id, body: this.state.comment} )
          }}
        >create comment</button>
        <ul>
          <li>{card.title}</li>
          <li>{card.slug}</li>
          <li>{card.game_id}</li>
          <li>{card.card_set}</li>
          <li>{card.type}</li>
          <li>{card.faction}</li>
          <li>{card.rarity}</li>
          <li>cost: {card.cost}</li>
          <li>attack: {card.attack}</li>
          <li>health: {card.health}</li>
          <li>{card.text}</li>
          <li>{card.flavor}</li>
          <li>{card.artist}</li>
          <li>{card.collectible ? "collectible" : "not collectible"}</li>
          <li>{card.elite ? "elite" : "not elite"}</li>
          <li>{card.race}</li>
          <li>{card.player_class}</li>
        </ul>
        {comments}
      </div>
    )
  }
}
