import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class KeywordFilter extends React.Component {
  constructor(props) {
    super(props);
    this.setFilters = this.setFilters.bind(this);
    this.fetchCards = _.debounce(props.fetchCards, 300);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.Input.focus();
  }

  setFilters(keyword) {
    const pagination = _.merge(this.props.filters.pagination, { page: 1 });
    const newFilters = Object.assign({}, this.props.filters, { keyword }, { pagination });
    this.props.setFilters(newFilters);
  }

  handleChange(e) {
    this.setFilters(e.target.value);
    this.fetchCards();
  }

  render() {
    const { keyword } = this.props.filters;
    return (
      <div className="field">
        <p className="control has-icons-left">
          <span className="icon is-small is-left">
            <i className="fa fa-search" />
          </span>
          <input
            ref={(input) => { this.Input = input; }}
            value={keyword}
            onChange={this.handleChange}
            className="input"
            type="text"
            placeholder="Search card"
          />
        </p>
      </div>
    );
  }
}

KeywordFilter.propTypes = {
  setFilters: PropTypes.func.isRequired,
  fetchCards: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default KeywordFilter;
