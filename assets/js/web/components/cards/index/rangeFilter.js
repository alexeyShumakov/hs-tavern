import React from "react";
import Slider, { Range } from "rc-slider";

const marks = {
  0: 0, 7: "7+"
}
export default (props) => {
  const {field, setFilters, fetchCards, filters} = props;
  const handleChange = (e) => {
    console.log(e);
    const pagination = {pagination: {page: 1}};
    let rangeFilter = {};
    rangeFilter[field] = e;
    const newFilters = Object.assign({}, filters, pagination, rangeFilter);
    setFilters(newFilters);
  }
  return(
    <div className="slider-wrapper">
      <Range
        className={props.classFilter}
        onChange={handleChange}
        onAfterChange={()=> {
          fetchCards(true);
          props.setDirty(true);
        }}
        allowCross={false}
        marks={marks}
        min={0}
        max={7}
        value={filters[field]}
      />
    </div>
  )
}
