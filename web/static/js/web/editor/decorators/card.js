import React from "react";
import {Modifier, CompositeDecorator, Editor, EditorState, convertToRaw, SelectionState} from "draft-js";
import actions from "../../actions/bindActions";

const CARD_REGEX = /%[\w]+\s?([\w]+)?/g;
const CURRENT_CARD_REGEX = /%[\w]+\s?([\w]+)?$/g;

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
  text = text.match(CURRENT_CARD_REGEX);
    if( text !== null ) {
      text =text[0].slice(1);
      actions.ceFetchCardSuggestions(text);
    } else {
      actions.ceSetCardSuggestions([]);
    }
  findWithRegex(CARD_REGEX, contentBlock, callback);
}

export default {strategy, component};

export function selectCard(editorState, suggestion) {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('CARD', 'IMMUTABLE', suggestion);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const key = selectionState.getAnchorKey();
  const selectedBlock = contentState.getBlockForKey(key);

  let startSelection = selectionState.getStartOffset();
  let text = selectedBlock.getText().slice(0, startSelection + 1);
  let {title} = suggestion;
  text = CURRENT_CARD_REGEX.exec(text);
  let newSelectionState = new SelectionState({
    anchorKey: selectedBlock.getKey(),
    anchorOffset: text.index,
    focusKey: selectedBlock.getKey(),
    focusOffset: text.index + text[0].length
  });

  const textWithEntity = Modifier.replaceText(contentStateWithEntity, newSelectionState, title, null, entityKey);
  newSelectionState = new SelectionState({
    anchorKey: selectedBlock.getKey(),
    anchorOffset: text.index + title.length,
    focusKey: selectedBlock.getKey(),
    focusOffset: text.index + title.length
  });
  const newEditorState = EditorState.set(editorState,  {currentContent: textWithEntity});
  actions.ceSetCardSuggestions([]);
  return EditorState.acceptSelection(newEditorState, newSelectionState);

}
