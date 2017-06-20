import React from "react";

export default(props) => {
  const {likesCount, commentsCount, likeMe, likeCallback} = props;
  return(
    <div className="level">
      <div className="level-left">
        <a className="level-item">
          <span>{likesCount}</span>
          <span className="icon is-small" onClick={likeCallback}>
            <i className={`fa fa-heart${likeMe ? "" : "-o"}`}></i>
          </span>
        </a>
        <a className="level-item">
          <span>{commentsCount}</span>
          <span className="icon is-small"><i className="fa fa-comment"></i></span>
        </a>
      </div>
    </div>

  )
}
