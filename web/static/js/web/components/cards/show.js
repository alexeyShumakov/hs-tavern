import React from "react";

export default class CardsIndex extends React.Component {
  constructor(props) {
    super(props);
    const { cardId } = props.route.match.params;
    const { fetchCard } = props.actions;
    fetchCard(cardId);
  }

  componentWillUnmount() {
    this.props.actions.clearCard();
  }

  render() {
    const card = this.props.store.cards.show;
    console.log(card);
    return(
      <div>
        <img src={card.img} alt=""/>
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
      </div>
    )
  }
}
