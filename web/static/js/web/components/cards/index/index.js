import React from "react";
import Card from "./card";
import Waypoint from "react-waypoint";

export default class ShowCard extends React.Component {
  constructor(props) {
    super(props);
    //props.actions.fetchCards();
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.clearCards();
  }

  nextPage() {
    const filters = this.props.store.cards.filters;
    const total_pages = filters.pagination.total_pages;
    const current_page = filters.pagination.page;
    if(current_page > 0 && current_page < total_pages) {
      const pagination = {pagination: {page:  current_page + 1}}
      const new_filters = Object.assign({}, filters, pagination)
      this.props.actions.setCardsFilters(new_filters)
      this.props.actions.pushCards();
    }
  }

  render() {
    const cards = this.props.store.cards.index.map((card)=>{
      return(
        <Card key={card.id} card={card}/>
      )
    })
    return(
      <div>
        <div className="field">
          <p className="control">
            <input className="input" type="text" placeholder="Search card"/>
          </p>
        </div>
        <div className="columns is-multiline">
          {cards}
        </div>
        <Waypoint onEnter={this.nextPage} />
      </div>
    )
  }
}
