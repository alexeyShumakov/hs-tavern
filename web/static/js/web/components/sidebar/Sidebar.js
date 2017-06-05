import React from "react";
import { Link } from 'react-router-dom';

export default (props) => (
  <div>
    <aside className="menu">
      <ul className="menu-list">
        <li><Link to="/cards">Cards</Link></li>
        <li><Link to="/">Home</Link></li>
        <li><a href="#">Desks</a></li>
        <li><Link to="/builder">Desk builder</Link></li>
        <li><a href="#">Expansions</a></li>
        <li><a href="#">Adventures</a></li>
        <li><a href="#">Tables</a></li>
        <li><a href="#">Ads</a></li>
      </ul>
    </aside>
  </div>
)
