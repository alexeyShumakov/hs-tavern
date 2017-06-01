import React from "react";
import Time from "../../utils/time";

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
                  if(props.store.user.is_authenticated) {
                    props.actions.likeCardComment(props.comment.id)
                  } else {
                    props.actions.setModal(true);
                  }
                }}
              ><i className={`fa fa-heart${props.comment.like_me ? "" : "-o"}`}></i></span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
