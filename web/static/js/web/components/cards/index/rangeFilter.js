import React from "react";
import Slider, { Range } from "rc-slider";

const marks = {
  0: 0, 7: "7+"
}
export default (props) => {
  const handleChange = (e) => {
    const {field, setFilters, fetchCards, filters} = props;
    const pagination = {pagination: {page: 1}};
    let rangeFilter = {};
    rangeFilter[field] = {min:e[0], max:e[1]}
    const newFilters = Object.assign({}, filters, pagination, rangeFilter);
    setFilters(newFilters);
    props.setDirty(true);
    fetchCards(true);
  }
  return(
    <div className="slider-wrapper">
      <Range
        className={props.classFilter}
        onAfterChange={handleChange}
        allowCross={false}
        marks={marks}
        min={0}
        max={7}
        defaultValue={[0,7]}
      />
    </div>
  )
}
