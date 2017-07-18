import React from "react";
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);


function component(props) {
  const links = linkify.match(props.decoratedText);
  const href = links && links[0] ? links[0].url : '';
  return(<a
           href={href}
           data-offset-key={props.offsetKey}
         >{props.children}</a>);
}

function strategy(contentBlock, callback, contentState) {
  const links = linkify.match(contentBlock.get('text'));
  links && links.forEach((link)=>{
    callback(link.index, link.lastIndex)
  })
}

export default {strategy, component};
