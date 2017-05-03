import React from "react";
import { Link } from 'react-router-dom';

export default (props) => {
  const style = {
    backgroundImage: `url(${props.card.img})`
  }
  return(
    <div className="column is-one-third-tablet is-one-third-desktop">
      <Link to={`/cards/${props.card.slug}`}>
        <div style={style} className="hs-card"/>
      </Link>
    </div>
  )
}
