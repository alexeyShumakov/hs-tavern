import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

export default class KeywordDeskFilter extends React.Component {
  constructor(props) {
    super(props);
    this.setFilters = this.setFilters.bind(this);
    const fetchDesks = () => { props.fetch() }
    this.fetch = _.debounce(fetchDesks, 300);
  }
  setFilters(keyword) {
    const newFilters = Object.assign({}, this.props.filters, {keyword, page: 1});
    this.props.setFilters(newFilters);
  }

  componentDidMount(){
    this.Input.focus();
  }
  render() {
    const {keyword} = this.props.filters;
    return(
    <div className="field">
      <p className="control has-icons-left">
        <span className="icon is-small is-left">
          <i className="fa fa-search"></i>
        </span>
        <input
          ref={(input) => { this.Input = input; }}
          value={keyword}
          onChange={(e)=> {
            this.setFilters(e.target.value);
            this.fetch();
          }}
          className="input"
          type="text"
          placeholder="Search desk"
        />
      </p>
    </div>

    )
  }
}

KeywordDeskFilter.propTypes = {
  fetch: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}
