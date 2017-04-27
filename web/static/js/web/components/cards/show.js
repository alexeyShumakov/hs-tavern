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
    return(
      <div>
        {card.title}
        <img src={card.img} alt=""/>
      </div>
    )
  }
}
