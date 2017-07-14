import React from "react";
import {Modifier, CompositeDecorator, Editor, EditorState, convertToRaw, SelectionState} from "draft-js";
import _ from "lodash";
import Tooltip from "react-tooltip";
import mentionDecorator, {selectMention} from "../../editor/decorators/mention";
import selectedMentionDecorator from "../../editor/decorators/selectedMention";

export default class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      mentionDecorator, selectedMentionDecorator
    ])
    const editorState = EditorState.createEmpty(compositeDecorator);
    this.state = {editorState, suggestions: []};
    this.onChange = (editorState) => this.setState({editorState})
  }

  render() {
    let {commentEditorState, createCallback, currentUser, openAuthModal} = this.props;

    return(
      <div>
        <Tooltip effect="solid"/>
        {currentUser.is_authenticated ?
          <div className="media">
            <div className="media-left">
              <p className="image is-48x48">
                <img src={currentUser.avatar}/>
              </p>
            </div>

            <div className="media-content">
              <div className="field">
                <div className="control box">
                  <Editor
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    handleReturn={(e)=>{
                      const {editorState} = this.state;
                      const {mentionSuggestions} = this.props.commentEditorState;
                        if(!_.isEmpty(mentionSuggestions)) {
                          const newEditorState = selectMention(editorState, mentionSuggestions[0]);
                          this.setState({editorState: newEditorState})
                          return "handled";
                        }
                      return "not-nandled";
                    }}
                    onTab={(e)=>{e.preventDefault(), console.log("TAB")}}
                  />
                </div>
                { !_.isEmpty(commentEditorState.mentionSuggestions) &&
                  <ul>
                    {commentEditorState.mentionSuggestions.map((suggestion)=>{
                      return <li key={suggestion.id}>{suggestion.name}</li>
                    })}
                  </ul>
                }
              </div>

              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <button className="button"
                      onClick={()=> {
                        let rawContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
                        createCallback(rawContent)
                      }}
                    >create comment</button>
                  </div>
                </div>
                <div className="level-right">
                  <div className="block">
                    <div className="field is-grouped">
                      <a data-tip="Attach image" className="button is-small is-white">
                        <span className="icon is-small">
                          <i className="fa fa-image"></i>
                        </span>
                      </a>
                      <a data-tip="Insert desk" className="button is-small is-white">
                        <span className="icon is-small">
                          <i className="fa fa-navicon"></i>
                        </span>
                      </a>
                      <a data-tip="Insert emoji" className="button is-small is-white">
                        <span className="icon is-small">
                          <i className="fa fa-smile-o"></i>
                        </span>
                      </a>
                    </div>
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
