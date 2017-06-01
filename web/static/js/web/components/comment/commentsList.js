import React from "react";
import Comment from "./comment";
export default class CommentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showUploadButton: props.totalCount > 3}
  }

  render() {
  const comments = this.props.comments.map((c)=> {
    return(<Comment
      key={c.id}
      comment={c}
      store={this.props.store}
      actions={this.props.actions}
      />)
  })

    return(
      <div>
        {this.state.showUploadButton &&
          <div className="notification is-pointer has-text-centered"
            onClick={ () => {
              this.setState({showUploadButton: false});
              this.props.actions.fetchAllCardComments(this.props.parent.id);
            }}
          >
          Show all comments
          </div>
        }
        {comments}
      </div>
    )
  }
}
