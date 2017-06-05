import React from "react";
import _ from "lodash";

export default class KeywordFilter extends React.Component {
  constructor(props) {
    super(props);
    this.setFilters = this.setFilters.bind(this);
    this.fetchCards = _.debounce(props.fetchCards, 300);
  }
  setFilters(keyword) {
    const pagination = _.merge(this.props.filters.pagination, {page: 1});
    const newFilters = Object.assign({}, this.props.filters, {keyword}, {pagination: pagination});
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
            this.fetchCards();
          }}
          className="input"
          type="text"
          placeholder="Search card"
        />
      </p>
    </div>

    )
  }
}
