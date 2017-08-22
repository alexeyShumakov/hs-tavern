import React from 'react';
import PropTypes from 'prop-types';

const Filter = props => (
  <div className="tabs">
    <ul>
      <li className={props.currentClass === props.selectedClass ? 'is-active' : ''}>
        <a role="presentation" onClick={() => { props.callback(props.currentClass); }} >
          {props.currentClass}
        </a>
      </li>
      <li className={props.selectedClass === 'Neutral' ? 'is-active' : ''} >
        <a role="presentation" onClick={() => { props.callback('Neutral'); }} >Neutral</a>
      </li>
    </ul>
  </div>
);

Filter.propTypes = {
  callback: PropTypes.func.isRequired,
  selectedClass: PropTypes.string.isRequired,
  currentClass: PropTypes.string.isRequired,
};

export default Filter;
