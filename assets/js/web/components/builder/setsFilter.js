import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types';


const SetsFilter = (props) => {
  const {setFilters, fetchCards, filters} = props;
  const handleChange = (e) => {
    const pagination = _.merge(filters.pagination, {page: 1});
    const newFilters = Object.assign({}, filters, {pagination}, {set: e.target.value});
    setFilters(newFilters);
    fetchCards(true);
  };

  return(
    <div className="field">
      <p className="control">
        <span className="select is-fullwidth">
          <select value={filters.set} onChange={handleChange}>
            <option value="All">All Sets</option>
            <option value="Basic">Basic</option>
            <option value="Classic">Classic</option>
            <option value="Hall of Fame">Hall of Fame</option>
            <option value="Naxxramas">Curse of Naxxramas</option>
            <option value="Goblins vs Gnomes">Goblins vs Gnomes</option>
            <option value="Blackrock Mountain">Blackrock Mountain</option>
            <option value="The Grand Tournament">The Grand Tournament</option>
            <option value="The League of Explorers">The League of Explorers</option>
            <option value="Whispers of the Old Gods">Whispers of the Old Gods</option>
            <option value="One Night in Karazhan">One Night in Karazhan</option>
            <option value="Mean Streets of Gadgetzan">Mean Streets of Gadgetzan</option>
            <option value="Journey to Un'Goro">Journey to Un'Goro</option>
          </select>
        </span>
      </p>
    </div>
  )
}

SetsFilter.propTypes = {
  setFilters: PropTypes.func.isRequired,
  fetchCards: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired
}

export default SetsFilter;
