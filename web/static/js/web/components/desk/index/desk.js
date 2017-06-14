import React from "react";

export default class Desk extends React.Component {
  render() {
    const { desk } = this.props;
    return(
      <div className="media">
        <div className="media-left">
          {desk.player_class}
        </div>
        <div className="media-content">
          {desk.title} by {desk.user.name}
          <div className="level">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-heart"></i></span>
              </a>
              <a className="level-item">
                <span className="icon is-small"><i className="fa fa-comment"></i></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
