import React from "react";
import PropTypes from "prop-types";

const classFilter = (props) => {
  const handleChange = (e) => {
    const newFilters = Object.assign({}, props.filters, {player_class: e.target.value, page: 1});
    props.setFilters(newFilters)
    props.fetch();
  }
  return(
    <div className="field">
      <p className="control">
        <span className="select is-fullwidth">
          <select value={props.filters.player_class} onChange={handleChange}>
            <option value="All">All Classes</option>
            <option value="Hunter">Hunter</option>
            <option value="Mage">Mage</option>
            <option value="Shaman">Shaman</option>
            <option value="Druid">Druid</option>
            <option value="Priest">Priest</option>
            <option value="Paladin">Paladin</option>
            <option value="Rogue">Rogue</option>
            <option value="Warlock">Warlock</option>
            <option value="Warrior">Warrior</option>
          </select>
        </span>
      </p>
    </div>
  )
}

classFilter.propTypes = {
  fetch: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default classFilter
