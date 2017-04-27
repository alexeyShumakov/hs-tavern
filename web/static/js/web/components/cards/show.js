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
    return(
      <div>
        {this.props.store.cards.show.title}
      </div>
    )
  }
}
