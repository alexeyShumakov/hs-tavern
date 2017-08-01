import React from "react";

export default (props) => {
  return(
    <div className="media suggestion" onClick={props.clickCallback}>
      <div className="media-content">
        <span className={`is-${props.suggestion.rarity.toLowerCase()}`}>{props.suggestion.title}</span>
      </div>
    </div>
  )
}
