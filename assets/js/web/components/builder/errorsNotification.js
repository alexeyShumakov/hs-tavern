import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const DeskErrors = props => (
  <div className="message is-danger">
    <div className="message-body">
      <ul> {_.map(props.errors, obj => <li key={obj}>{obj}</li>)} </ul>
    </div>
  </div>
);

DeskErrors.propTypes = {
  errors: PropTypes.object.isRequired,
};

export default DeskErrors;
