import React from "react";
import PropTypes from "prop-types";

const Item = (props) => {
  return(
    <li onClick={props.setCurrent}>
      <a className={props.isCurrent ? "is-active" : ""}>{props.title}</a>
    </li>
  )
}

class PopularityFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filters: ["new", "hot"]}
  }

  render() {
    const { setFilters, fetch, filters } = this.props;
    return(
      <div className="menu">
        <ul className="menu-list">
          {this.state.filters.map((title)=>{
            return <Item
              key={title}
              title={title}
              isCurrent={title == filters.popularity}
              setCurrent={()=>{
                const newFilters = Object.assign({}, filters, {popularity: title, page: 1});
                setFilters(newFilters);
                fetch();
              }}
              />
          })}
        </ul>
      </div>
    )
  }
}

PopularityFilter.propTypes = {
  fetch: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
}

export default PopularityFilter


