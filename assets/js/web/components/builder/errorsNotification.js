import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class DeskErrors extends React.Component {
  render() {
    let {errors} = this.props;
    return(
      <div className="message is-danger">
        <div className="message-body">
          <ul> {_.map(errors, (obj)=> {return <li key={obj}>{obj}</li>})} </ul>
        </div>
      </div>
    )
  }
}

DeskErrors.propTypes = {
  errors: PropTypes.object.isRequired
}

export default DeskErrors;
