import React from 'react';
import PropTypes from 'prop-types';

const DescriptionEditor = props => (
  <div className="box">
    <h2 className="title is-4">Description</h2>
    <div className="field">
      <p className="control">
        <textarea
          value={props.desk.description}
          className="textarea"
          placeholder="Textarea"
          onChange={(e) => {
            const newDesk = Object.assign({}, props.desk, { description: e.target.value });
            props.builderSetDesk(newDesk);
          }}
        />
      </p>
    </div>
  </div>
);

DescriptionEditor.propTypes = {
  builderSetDesk: PropTypes.func.isRequired,
  desk: PropTypes.shape({
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default DescriptionEditor;
