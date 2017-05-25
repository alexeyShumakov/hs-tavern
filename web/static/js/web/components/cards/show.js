import React from "react";
import Card from "./card";

export default class CardsShow extends React.Component {
  constructor(props) {
    super(props);
    const { slug } = props.store.cards.show;
    const { cardsExecChannel } = props.actions;
    cardsExecChannel(slug);
  }

  render() {
    return(
      <div className="columns">
        <div className="column is-three-quarters">
          <Card store={this.props.store}  actions={this.props.actions}/>
        </div>
      </div>
    )
  }
}
