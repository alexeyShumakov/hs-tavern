import React from "react";
import Time from "../../utils/time";
import axios from "../../utils/axios";


export default (props) => {
  return(
    <div className="media">
      <div className="media-left">
        <p className="image is-48x48">
          <img src={props.comment.user.avatar}/>
        </p>
      </div>

      <div className="media-content">
        <strong>{props.comment.user.name}</strong>
        <small> <Time time={props.comment.inserted_at}/></small>
        <div className="content"> {props.comment.body} </div>

        <nav className="level">
          <div className="level-left">
            <a className="level-item">
              {props.comment.likes_count}
              <span className="icon is-small"
                onClick={()=>{
                  props.actions.likeCardComment(props.comment.id)
                }}
              ><i className="fa fa-heart"></i></span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
