import React from 'react';
import { Range } from 'rc-slider';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleAfterChange = this.handleAfterChange.bind(this);
  }

  handleChange(e) {
    const { filters, setFilters, field } = this.props;
    const rangeFilter = {};
    rangeFilter[field] = { min: e[0], max: e[1] };
    const newFilters = Object.assign({}, filters, rangeFilter);
    setFilters(newFilters);
  }

  handleAfterChange() {
    const { filters, setFilters, fetchCards } = this.props;
    const pagination = _.merge(filters.pagination, { page: 1 });
    const newFilters = Object.assign({}, filters, { pagination });
    setFilters(newFilters);
    fetchCards();
  }

  render() {
    const { filters, field } = this.props;
    return (
      <div className="slider-wrapper">
        <Range
          value={[filters[field].min, filters[field].max]}
          onAfterChange={this.handleAfterChange}
          onChange={this.handleChange}
          className="cost-filter"
          allowCross={false}
          marks={{ 0: 0, 7: '7+' }}
          min={0}
          max={7}
        />
      </div>
    );
  }
}

Filter.propTypes = {
  field: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired,
  fetchCards: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Filter;
