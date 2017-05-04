import React from "react";

export default (props) => {
  const handleChange = (e) => {
    const pagination = {pagination: {page: 1}}
    const classFilter = {player_class: e.target.value}
    const newFilters = Object.assign({}, props.filters, pagination, classFilter);
    props.setFilters(newFilters)
    props.fetchCards(true);
    props.setDirty(true);
  }
  return(
    <div className="field">
      <p className="control">
        <span className="select is-fullwidth">
          <select onChange={handleChange}>
            <option value="All">All Classes</option>
            <option value="Neutral">Neutral</option>
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
