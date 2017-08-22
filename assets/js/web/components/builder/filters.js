import React from 'react';
import PropTypes from 'prop-types';

import ClassFilter from './classFilter';
import CostFilter from './costFilter';
import KeywordFilter from './keywordFilter';
import SetsFilter from './setsFilter';

const Filters = (props) => {
  const { fetchCards, setFilters, filters, currentClass, selectedClass } = props;
  return (
    <div className="builder-filters">
      <div className="columns">
        <div className="column is-half">
          <KeywordFilter {...{ fetchCards, setFilters, filters }} />
        </div>

        <div className="column">
          <SetsFilter {...{ filters, fetchCards, setFilters }} />
        </div>

        <div className="column">
          <div className="slider-wrapper">
            <CostFilter field="cost" classFilter="cost" {...{ filters, fetchCards, setFilters }} />
          </div>
        </div>
      </div>

      <ClassFilter
        callback={(playerClass) => {
          setFilters(Object.assign({}, filters, { player_class: playerClass }));
          fetchCards();
        }}
        {...{ currentClass, selectedClass }}
      />
    </div>
  );
};

Filters.propTypes = {
  fetchCards: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  currentClass: PropTypes.string.isRequired,
  selectedClass: PropTypes.string,
};

export default Filters;
