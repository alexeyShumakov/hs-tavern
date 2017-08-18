import React from "react";
import PropTypes from "prop-types";

const Filter = (props) => {
  return(
    <div className="tabs">
      <ul>
        <li
          onClick={()=>{props.callback(props.currentClass)}}
          className={props.currentClass == props.selectedClass ? "is-active" : ""}>
          <a>{props.currentClass}</a>
        </li>
        <li
          onClick={()=>{props.callback("Neutral")}}
          className={"Neutral" == props.selectedClass ? "is-active" : ""}>
          <a>Neutral</a>
    </li>
      </ul>
    </div>
  )
}

Filter.propTypes = {
  callback: PropTypes.func.isRequired,
  selectedClass: PropTypes.string,
  currentClass: PropTypes.string
}

export default Filter;
