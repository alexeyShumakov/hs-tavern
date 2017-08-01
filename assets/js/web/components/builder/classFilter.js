import React from "react";
export default (props) => {
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
