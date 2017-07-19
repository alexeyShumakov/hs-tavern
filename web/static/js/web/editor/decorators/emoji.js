import React from "react";
import _ from "lodash";
import emojione from "emojione";
const customShortNames =  emojione.shortnames.split('|').join(' |');
const regShortNames = new RegExp(customShortNames, "gi");

function getEmoji(text) {
  const shortName = emojione.toShort(_.trim(text.toLowerCase()))
  return emojione.emojioneList[shortName];
}
function component(props) {
  const {uc_base} = getEmoji(props.decoratedText)
  const backgroundImage = `url(${emojione.defaultPathPNG}${emojione.emojiSize}/${uc_base}.png)`
  const style = {backgroundImage}
  return(
    <span className="editor-emoji" style={style} data-offset-key={props.offsetKey}>{props.children}</span>
  );
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();

  let matchArr, start;
  while((matchArr = regex.exec(text)) != null) {
    start = matchArr.index;
    getEmoji(matchArr[0]) && callback(start, start + matchArr[0].length - 1);
  }
}

function strategy(contentBlock, callback, contentState) {
  findWithRegex(regShortNames, contentBlock, callback);
}

export default {strategy, component};
