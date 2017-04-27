import React from "react";
import { Link } from 'react-router-dom';

export default (props) => {
  return(
    <div>
      <Link to={`/cards/${props.card.slug}`}>{props.card.title}</Link>
      <img src={props.card.img} alt=""/>
    </div>
  )
}
