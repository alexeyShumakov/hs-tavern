import React from "react";
import Time from "../../utils/time";

export default (props) => {
  const {comment} = props;
  return(
    <div className="media">
      <div className="media-left">
        <p className="image is-48x48">
          <img src={comment.user.avatar}/>
        </p>
      </div>

      <div className="media-content">
        <strong>{comment.user.name}</strong>
        <small> <Time time={comment.inserted_at}/></small>
        <div className="content"> {comment.body} </div>

        <nav className="level">
          <div className="level-left">
            <a className="level-item">
              {comment.likes_count}
              <span className="icon is-small"
                onClick={()=>{
                  if(props.isLogin) {
                    props.likeCallback(comment.id)
                  } else {
                    props.openAuthModal()
                  }
                }}
              ><i className={`fa fa-heart${comment.like_me ? "" : "-o"}`}></i></span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  )
}
