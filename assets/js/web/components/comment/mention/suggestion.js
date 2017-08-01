import React from "react";

export default (props) => {
  return(
    <div className="media suggestion" onClick={props.clickCallback}>
      <div className="media-left">
        <p className="image is-32x32">
          <img alt="" src={props.suggestion.avatar}/>
        </p>
      </div>
      <div className="media-content">
        {props.suggestion.name}
      </div>
    </div>
  )
}
