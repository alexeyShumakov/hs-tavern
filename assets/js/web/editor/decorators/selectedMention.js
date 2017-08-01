import React from "react";
import {CompositeDecorator, Editor, EditorState, convertToRaw} from "draft-js";
import actions from "../../actions/bindActions";
import {Link} from "react-router-dom";

class Mention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showPrev: false}
  }

  render() {
    const user = this.props.contentState.getEntity(this.props.entityKey).getData();
    return(
      <Link
        onMouseEnter={()=>{this.setState({showPrev: true})}}
        onMouseLeave={()=>{this.setState({showPrev: false})}}
        to={`/users/${user['id']}`}
        data-id={user['id']}
        className="mention">
        {this.state.showPrev &&
          <div className="mention__info box media">
              <div className="media-left">
               <figure className="image is-32x32">
                <img src={user["avatar"]} alt="Image"/>
              </figure>
              </div>
              <div className="media-content">
                <Link to={`/users/${user['id']}`}> {user['name']} </Link>
              </div>
          </div>
        }
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
          contentState.getEntity(entityKey).getType() === 'MENTION'
      );
    },
    callback,
  );
};

export default {strategy: strategy, component: Mention};
