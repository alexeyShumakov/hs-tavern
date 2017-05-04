import React from "react";

export default (props) => {
  const currentValue = props.filters.rarity;
  const handleChange = (e) => {
    const newValue = currentValue == e ? null : e
    const pagination = {pagination: {page: 1}}
    const rarityFilter = {rarity: newValue}
    const newFilters = Object.assign({}, props.filters, pagination, rarityFilter);
    props.setFilters(newFilters);
    props.setDirty(true);
    props.fetchCards(true);
  }
  let gems = ["Common", "Rare", "Epic", "Legendary"].map((value) =>{
    return(
      <div key={value} className="level-item has-text-centered">
        <a
          className={`button is-white rarity-${value.toLowerCase()}${value === currentValue ? "_is-selected": ""}`}
          onClick={()=> {handleChange(value)}} >
          <span>O</span>
        </a>
      </div>
    )
  })
  return(
    <div className="level">
      {gems}
    </div>
  )
}
