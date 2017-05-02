import React from "react";
import Card from "./card";
import Waypoint from "react-waypoint";
import KeywordFilter from "./keywordFilter";

export default class ShowCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true }
    props.actions.fetchCards().then(()=>{
      this.setState({isLoading: false})
    });
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillUnmount() {
    this.props.actions.clearCards();
  }

  nextPage() {
    const {isLoading} = this.state;
    const {filters} = this.props.store.cards;
    const total_pages = filters.pagination.total_pages;
    const current_page = filters.pagination.page;
    if(current_page > 0 && current_page < total_pages && !isLoading) {
      const pagination = {pagination: {page:  current_page + 1}}
      const new_filters = Object.assign({}, filters, pagination)
      this.props.actions.setCardsFilters(new_filters)
      this.props.actions.pushCards();
    }
  }

  render() {
    const { store, actions } = this.props;
    const cards = store.cards.index.map((card)=>{
      return(
        <Card key={card.id} card={card}/>
      )
    })
    return(
      <div>
        <KeywordFilter
          filters={store.cards.filters}
          fetchCards={actions.fetchCards}
          setFilters={actions.setCardsFilters}
        />
        <div className="columns is-multiline">
          {cards}
        </div>
        <Waypoint onEnter={this.nextPage} />
      </div>
    )
  }
}
