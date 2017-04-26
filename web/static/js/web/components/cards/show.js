import React from "react";

export default class CardsIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {this.props.store.cards.show.title}
      </div>
    )
  }
}
