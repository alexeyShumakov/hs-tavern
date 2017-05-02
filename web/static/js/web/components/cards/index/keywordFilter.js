import React from "react";

export default (props) => {
  const {keyword} = props.filters;
  const handleChange = (e) => {
    const pagination = {pagination: {page: 1}}
    const keywordFilter = {keyword: e.target.value};
    const new_filters = Object.assign({}, props.filters, keywordFilter, pagination);
    props.setFilters(new_filters);
    props.fetchCards(true);
  }
  return(
    <div className="field">
      <p className="control">
        <input
          value={keyword}
          onChange={handleChange}
          className="input"
          type="text"
          placeholder="Search card"
        />
      </p>
    </div>

  )
}
