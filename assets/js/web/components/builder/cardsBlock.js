import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SearchCard from './searchCard';

class CardsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  fetch(delta) {
    const { fetchCards, setFilters, filters } = this.props;
    setFilters(_.merge(filters, { pagination: { page: filters.pagination.page + delta } }));
    fetchCards();
  }
  render() {
    const { cards, actions, desk, filters } = this.props;
    return (
      <div className="cards-block">
        <div className="level">
          <div className="level-left">
            { filters.pagination.page > 1 &&
              <div className="level-item">
                <button className="button" onClick={() => { this.fetch(-1); }} >
                  <span className="icon">
                    <i className="fa fa-chevron-left" />
                  </span>
                </button>
              </div>
            }
          </div>

          <div className="level-right">
            <div className="level-item">
              { filters.pagination.page < filters.pagination.total_pages &&
                <button className="button" onClick={() => { this.fetch(1); }} >
                  <span className="icon">
                    <i className="fa fa-chevron-right" />
                  </span>
                </button>
              }
            </div>
          </div>
        </div>

        <div className="columns is-multiline">
          { _.sortBy(cards, ['cost', 'title']).map(card => (
            <SearchCard key={card.id} {...{desk, card, actions}} />
          ))
          }
        </div>
      </div>
    );
  }
}

CardsBlock.porpTypes = {
  fetchCards: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  desk: PropTypes.object.isRequired,
};

export default CardsBlock;
