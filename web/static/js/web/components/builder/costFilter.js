import React from "react";
import Slider, { Range } from "rc-slider";
import _ from "lodash";

const marks = {
  0: 0, 7: "7+"
}
export default (props) => {
  const {field, setFilters, fetchCards, filters} = props;
  const handleChange = (e) => {
    let rangeFilter = {};
    rangeFilter[field] = {min: e[0], max: e[1]};
    const newFilters = Object.assign({}, filters, rangeFilter);
    setFilters(newFilters);
  }
  return(
    <div className="slider-wrapper">
      <Range
        className={props.classFilter}
        onChange={handleChange}
        onAfterChange={()=> {
          const pagination = _.merge(filters.pagination, {page: 1});
          const newFilters = Object.assign({}, filters, {pagination: pagination});
          setFilters(newFilters);
          fetchCards();
        }}
        allowCross={false}
        marks={marks}
        min={0}
        max={7}
        value={[filters[field]["min"], filters[field]["max"]]}
      />
    </div>
  )
}
