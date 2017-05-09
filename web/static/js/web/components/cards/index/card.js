import React from "react";
import { Link } from 'react-router-dom';

export default (props) => {
  const style = {
    backgroundImage: `url(${props.card.img})`
  }
  return(
    <div className="column is-one-third-tablet is-one-third-desktop">
      <div onClick={()=>{
        window.history.pushState(null, null, `/cards/${props.card.slug}`);
        props.actions.fetchCard(props.card.slug);
        props.actions.setCardsModal(true)
      }}
        style={style} className="hs-card"/>
    </div>
  )
}
