import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { isFullDesk, findCardInDesk, isFullDeskCard, checkCard } from '../../utils/builderUtils';

class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    const { card, desk, actions } = this.props;
    const deskCard = findCardInDesk(card, desk);
    if (!isFullDesk(desk) && deskCard && checkCard(deskCard)) {
      const newCard = Object.assign({}, deskCard, { count: deskCard.count + 1 });
      return actions.builderUpdateDeskCard(newCard);
    }

    if (!isFullDesk(desk) && !deskCard) {
      let newCard = _.pick(card, ['img', 'cost', 'rarity', 'title']);
      newCard = Object.assign({}, newCard, { card_id: card.id, count: 1 });
      return actions.builderAddCardToDesk(newCard);
    }
    return '';
  }

  handlePanelClick() {
    const { card, actions } = this.props;
    window.history.pushState(null, null, `/cards/${card.slug}`);
    return actions.fetchCard(card.slug).then(() => { actions.openCardsModal(card); });
  }

  render() {
    const { card, desk } = this.props;
    const deskCard = findCardInDesk(card, desk);
    const style = { backgroundImage: `url(${card.img})` };
    return (
      <div className="column is-one-third-tablet is-one-third-desktop">
        <div className="hs-card__wrapper">
          <div className="hs-card__panel" onClick={this.handlePanelClick}>
            <a className="icon box is-marginless">
              <i className="fa fa-search" />
            </a>
          </div>
          <div className="hs-card" style={style} onClick={this.handleCardClick} />
          {isFullDeskCard(deskCard) && <div className="hs-card__overlay is-overlay" />}
        </div>
      </div>
    );
  }
}

SearchCard.propTypes = {
  card: PropTypes.object.isRequired,
  desk: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    builderUpdateDeskCard: PropTypes.func.isRequired,
    builderAddCardToDesk: PropTypes.func.isRequired,
    fetchCard: PropTypes.func.isRequired,
    openCardsModal: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchCard;
