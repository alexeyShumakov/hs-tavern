import React from "react";
import Time from "../../utils/time";
import commentChannel from "../../channels/comment";
import {Editor, EditorState, convertFromRaw, CompositeDecorator} from "draft-js";
import selectedMentionDecorator from "../../editor/decorators/selectedMention";

export default class Comment extends React.Component {
  constructor(props) {

    super(props);
    let channel = commentChannel(props.comment.id);
    let compositeDecorator = new CompositeDecorator([
      selectedMentionDecorator
    ])
    let editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(props.comment.body)), compositeDecorator)
    this.state = {channel, editorState};
  }

  componentWillUnmount() {
    this.state.channel.leave()
  }

  render() {
    const {isLogin, comment, likeCallback, openAuthModal} = this.props;
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
          <div className="content">
            <Editor
              editorState={this.state.editorState}
              readOnly={true}
            />
         </div>

          <nav className="level">
            <div className="level-left">
              <a className="level-item">
                {comment.likes_count}
                <span className="icon is-small"
                  onClick={()=>{
                    if(isLogin) {
                      this.state.channel.push("like", {comment_id: comment.id})
                    } else {
                      openAuthModal()
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
}
