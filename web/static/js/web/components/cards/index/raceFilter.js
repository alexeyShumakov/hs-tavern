import React from "react";

export default (props) => {
  const handleChange = (e) => {
    const pagination = {pagination: {page: 1}}
    const filter = {race: e.target.value}
    const newFilters = Object.assign({}, props.filters, pagination, filter);
    props.setFilters(newFilters)
    props.fetchCards(true);
    props.setDirty(true);
  }
  return(
    <div className="field">
      <p className="control">
        <span className="select is-fullwidth">
          <select value={props.filters.race } onChange={handleChange}>
            <option value="All">All Races</option>
            <option value="Beast">Beast</option>
            <option value="Dragon">Dragon</option>
            <option value="Elemental">Elemental</option>
            <option value="Murloc">Murloc</option>
            <option value="Pirate">Pirate</option>
            <option value="Totem">Totem</option>
            <option value="Mech">Mechanical</option>
          </select>
        </span>
      </p>
    </div>
  )
}
