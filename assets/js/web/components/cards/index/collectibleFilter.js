import React from "react";

export default (props) => {
  const handleChange = (e) => {
    const pagination = {pagination: {page: 1}}
    const newFilters = Object.assign({}, props.filters, pagination, {collectible: e.target.checked});
    props.setFilters(newFilters)
    props.setDirty(true);
    props.fetchCards(true);
  }
  return(
    <div className="field">
      <p className="control">
        <label className="checkbox">
          <input type="checkbox" onChange={handleChange} checked={props.filters.collectible}/>
          Collectible
        </label>
      </p>
    </div>
  )
}
