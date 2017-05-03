import React from "react";
import Card from "./card";
import Waypoint from "react-waypoint";
import KeywordFilter from "./keywordFilter";
import RangeFilter from "./rangeFilter";
import ClassFilter from "./classFilter";
import CollectibleFilter from "./collectibleFilter";

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
    const {filters} = this.props.store.cards;
    const { store, actions } = this.props;
    const cards = store.cards.index.map((card)=>{
      return(
        <Card key={card.id} card={card}/>
      )
    })
    return(
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box">
            <h1 className="title">Cards</h1>
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
        </div>
        <div className="column">
          <div className="box">
            <ClassFilter
              filters={store.cards.filters}
              fetchCards={actions.fetchCards}
              setFilters={actions.setCardsFilters}
            />
            <RangeFilter
              classFilter="cost-filter"
              filters={store.cards.filters}
              fetchCards={actions.fetchCards}
              setFilters={actions.setCardsFilters}
              field="cost"
            />
            <RangeFilter
              classFilter="attack-filter"
              filters={store.cards.filters}
              fetchCards={actions.fetchCards}
              setFilters={actions.setCardsFilters}
              field="attack"
            />
            <RangeFilter
              classFilter="health-filter"
              filters={store.cards.filters}
              fetchCards={actions.fetchCards}
              setFilters={actions.setCardsFilters}
              field="health"
            />
            <CollectibleFilter
              filters={store.cards.filters}
              fetchCards={actions.fetchCards}
              setFilters={actions.setCardsFilters}
            />
          </div>
        </div>
      </div>
    )
  }
}
