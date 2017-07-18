import React from "react";
import {Modifier, CompositeDecorator, Editor, EditorState, convertToRaw, SelectionState} from "draft-js";
import _ from "lodash";
import Tooltip from "react-tooltip";
import cardDecorator, {selectCard} from "../../editor/decorators/card";
import linkifyStrategy from "../../editor/decorators/linkify";
import mentionDecorator, {selectMention} from "../../editor/decorators/mention";
import selectedMentionDecorator from "../../editor/decorators/selectedMention";
import selectedCardDecorator from "../../editor/decorators/selectedCard";
import SuggestionsList from "./mention/suggestionsList";
import CardSuggestions from "./card/suggestionsList";

export default class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      mentionDecorator, selectedMentionDecorator,
      cardDecorator, selectedCardDecorator, linkifyStrategy
    ])
    const editorState = EditorState.createEmpty(compositeDecorator);
    this.state = {editorState};
    this.onChange = (editorState) => this.setState({editorState})
    this.handleSuggestion = this.handleSuggestion.bind(this);
  }

  handleSuggestion(e) {
    const {editorState} = this.state;
    const {mentionSuggestions, cardSuggestions, showToolbar} = this.props.commentEditorState;
      if(!_.isEmpty(mentionSuggestions)) {
        e.preventDefault();
        this.setState({editorState: selectMention(editorState, mentionSuggestions[0])}, () => {
          setTimeout(() => this.refs.editor.focus(), 0);
        })
        return "handled";
      }
      if(!_.isEmpty(cardSuggestions)) {
        e.preventDefault();
        this.setState({editorState: selectCard(editorState, cardSuggestions[0])}, () => {
          setTimeout(() => this.refs.editor.focus(), 0)
        })
        return "handled";
      }
    return "not-nandled";
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
            { !_.isEmpty(commentEditorState.mentionSuggestions) &&
              <div className="suggestion-wrapper">
                <SuggestionsList
                  editorState={this.state.editorState}
                  setNewEditorState={
                    (editorState) =>{
                      this.setState({editorState}, () => {
                        setTimeout(() => this.refs.editor.focus(), 0)
                      })
                    }
                  }
                  suggestions={commentEditorState.mentionSuggestions}
                />
              </div>
            }
            { !_.isEmpty(commentEditorState.cardSuggestions) &&
              <div className="suggestion-wrapper">
                <CardSuggestions
                  editorState={this.state.editorState}
                  setNewEditorState={
                    (editorState) =>{
                      this.setState({editorState}, () => {
                        setTimeout(() => this.refs.editor.focus(), 0)
                      })
                    }
                  }
                  suggestions={commentEditorState.cardSuggestions}
                />
              </div>
            }

            <div className="media-content">
              <div className="field">
                <div className="control box comment-editor">
                  <Editor
                    ref="editor"
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder="Write a comment..."
                    handleReturn={(e)=>{return this.handleSuggestion(e)}}
                    onTab={(e)=>{return this.handleSuggestion(e)}}
                  />
                </div>
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
