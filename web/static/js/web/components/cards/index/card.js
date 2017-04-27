import React from "react";
import { Link } from 'react-router-dom';

export default (props) => {
  return(
    <div>
      <Link to={`/cards/${props.card.id}`}>{props.card.title}</Link>
    </div>
  )
}
