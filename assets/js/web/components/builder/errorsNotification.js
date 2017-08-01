import React from "react";

export default class DeskErrors extends React.Component {
  render() {
    let {errors, isValid} = this.props;
    return(
      <div className="message is-danger">
        <div className="message-body">
          <ul>
            { Object.entries(errors).map((obj)=> {
              return <li key={obj[0]}>{obj[1]}</li>
            })
            }
          </ul>
        </div>
      </div>
    )
  }
}
