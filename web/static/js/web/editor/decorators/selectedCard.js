import React from "react";
import {CompositeDecorator, Editor, EditorState, convertToRaw} from "draft-js";
import actions from "../../actions/bindActions";
import {Link} from "react-router-dom";

class EditorCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showPrev: false}
  }

  render() {
    const card = this.props.contentState.getEntity(this.props.entityKey).getData();
    return(
      <Link
        onMouseEnter={()=>{this.setState({showPrev: true})}}
        onMouseLeave={()=>{this.setState({showPrev: false})}}
        onClick={()=> {
          actions.cardsExecChannel(card['slug'])
          actions.fetchCard(card['slug'])
        }}
        to={`/cards/${card['slug']}`}
        className={`editor-card is-${card['rarity'].toLowerCase()}`}>
      {this.props.children}
      </Link>
      );
  }
}

function strategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'CARD'
      );
    },
    callback,
  );
};

export default {strategy: strategy, component: EditorCard};
