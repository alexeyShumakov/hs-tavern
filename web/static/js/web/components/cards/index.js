import React from "react";

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
      return <div key={card.id}>{card.title} </div>
    })
    return(
      <div>
        {cards}
      </div>
    )
  }
}
