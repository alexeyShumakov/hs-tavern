import React from "react";
import { Link } from 'react-router-dom';

export default (props) => {
  return(<div>
      <ul>
        <li><Link to="/builder/druid">Druid</Link></li>
        <li><Link to="/builder/hunter">Hunter</Link></li>
        <li><Link to="/builder/mage">Mage</Link></li>
        <li><Link to="/builder/paladin">Paladin</Link></li>
        <li><Link to="/builder/priest">Priest</Link></li>
        <li><Link to="/builder/rogue">Rogue</Link></li>
        <li><Link to="/builder/shaman">Shaman</Link></li>
        <li><Link to="/builder/warlock">Warlock</Link></li>
        <li><Link to="/builder/warrior">Warrior</Link></li>
      </ul>
    </div>)
}
