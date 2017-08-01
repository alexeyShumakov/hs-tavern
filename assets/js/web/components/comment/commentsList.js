import React from "react";
import Comment from "./comment";
import CommentEditor from "./commentEditor";

export default class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showUploadButton: props.totalCount > 3}
  }

  render() {
    let {setToolbar, commentEditor, comments, likeCallback, openAuthModal, fetchComments, currentUser, createCallback} = this.props;
    comments = comments.map((c)=> {
      return(<Comment
        key={c.id}
        comment={c}
        isLogin={currentUser.is_authenticated}
        likeCallback={likeCallback}
        openAuthModal={openAuthModal}
        currentUser={currentUser}
        />)
    })

    return(
      <div>
        {this.state.showUploadButton &&
          <div className="notification is-pointer has-text-centered"
            onClick={ () => {
              this.setState({showUploadButton: false});
              fetchComments();
            }}
          >
          Show all comments
          </div>
        }
        {comments}
        <CommentEditor
          commentEditorState={commentEditor}
          currentUser={currentUser}
          createCallback={createCallback}
          openAuthModal={openAuthModal}/>
      </div>
    )
  }
}
