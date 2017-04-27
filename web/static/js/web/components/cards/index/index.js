import React from "react";
import Card from "./card";

export default class ShowCard extends React.Component {
  constructor(props) {
    super(props);
    props.actions.fetchCards();
  }

  componentWillUnmount() {
    this.props.actions.clearCards();

  }

  render() {
    const cards = this.props.store.cards.index.map((card)=>{
      return <Card key={card.id} card={card}/>
    })
    return(
      <div>
        {cards}
      </div>
    )
  }
}
