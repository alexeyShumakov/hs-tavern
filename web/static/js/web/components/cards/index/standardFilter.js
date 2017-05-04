import React from "react";

export default (props) => {
  const handleChange = (e) => {
    const pagination = {pagination: {page: 1}}
    const newFilters = Object.assign({}, props.filters, pagination, {standard: e.target.checked});
    props.setFilters(newFilters)
    props.fetchCards(true);
    props.setDirty(true);
  }
  return(
    <div className="field">
      <p className="control">
        <label className="checkbox">
          <input type="checkbox" onChange={handleChange} defaultChecked={true}/>
          Standard
        </label>
      </p>
    </div>
  )
}
