import React from "react";
import {Modifier, CompositeDecorator, Editor, EditorState, convertToRaw, SelectionState} from "draft-js";
import actions from "../../actions/bindActions";

const MENTION_REGEX = /\@[\w]+\s?([\w]+)?/g;
const CURRENT_MENTION_REGEX = /\@[\w]+\s?([\w]+)?$/g;

function component(props) {
  return(<a
           data-offset-key={props.offsetKey}
         >{props.children}</a>);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while((matchArr = regex.exec(text)) != null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
function strategy(contentBlock, callback, contentState) {
  let selection = contentState.getSelectionAfter();
  let startSelection = selection.getStartOffset();
  let text = contentBlock.getText().slice(0, startSelection + 1);
  text = text.match(CURRENT_MENTION_REGEX)
    if( text !== null ) {
      text =text[0].slice(1);
      actions.ceFetchMentionSuggestions(text);
    } else {
      actions.ceSetMentionSuggestions([]);
    }
  findWithRegex(MENTION_REGEX, contentBlock, callback);
}

export default {strategy, component};

export function selectMention(editorState, suggestion) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('MENTION', 'IMMUTABLE', suggestion)
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const key = selectionState.getAnchorKey();
  const selectedBlock = contentState.getBlockForKey(key);

  let startSelection = selectionState.getStartOffset();
  let text = selectedBlock.getText().slice(0, startSelection + 1);
  let name = suggestion.name
  text = CURRENT_MENTION_REGEX.exec(text)
  let newSelectionState = new SelectionState({
    anchorKey: selectedBlock.getKey(),
    anchorOffset: text.index,
    focusKey: selectedBlock.getKey(),
    focusOffset: text.index + text[0].length
  })
  text = text[0].slice(1);

  const textWithEntity = Modifier.replaceText(contentStateWithEntity, newSelectionState, name, null, entityKey);
  newSelectionState = new SelectionState({
    anchorKey: selectedBlock.getKey(),
    anchorOffset: text.index + text[0].length,
    focusKey: selectedBlock.getKey(),
    focusOffset: text.index + text[0].length
  })
  const newEditorState = EditorState.set(editorState,  {currentContent: textWithEntity})
  actions.ceSetMentionSuggestions([]);
  return EditorState.acceptSelection(newEditorState, newSelectionState)

}
