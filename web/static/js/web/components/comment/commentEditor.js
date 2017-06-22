import React from "react";

export default class CommentEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {comment: ""};
  }

  render() {
    let {createCallback, currentUser, openAuthModal} = this.props;

    return(
      <div>
        {currentUser.is_authenticated ?
          <div className="media">
            <div className="media-left">
              <p className="image is-48x48">
                <img src={currentUser.avatar}/>
              </p>
            </div>

            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea
                    className="textarea"
                    onChange={(e) => {this.setState({comment: e.target.value})}}
                    value={this.state.comment} id="" name="" cols="30" rows="10">
                  </textarea>
                </p>
              </div>

              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button"
                      onClick={()=> {
                        this.setState({comment: ""});
                        createCallback(this.state.comment)
                      }}
                    >create comment</button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          :
            <article
              onClick={openAuthModal}
              className="notification is-pointer has-text-centered">
              <div>
                Please, Sing in to comment
              </div>
            </article>
        }
      </div>
    )
  }
}
