import React from "react";
import _ from "lodash";
import {isFullDesk, findCardInDesk, isFullDeskCard, checkCard} from "../../utils/builderUtils";

export default class SearchCard extends React.Component {
  constructor(props) {
    super(props);
    this.handlePanelClick = this.handlePanelClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  handleCardClick() {
    let {card, desk, actions} = this.props;
    let deskCard = findCardInDesk(card, desk);
    if(!isFullDesk(desk) && deskCard && checkCard(deskCard))
      return actions.builderUpdateDeskCard(Object.assign({}, deskCard, {count: deskCard.count + 1}));

    if(!isFullDesk(desk) && !deskCard) {
      let newCard = _.pick(card, ["img", "cost", "rarity", "title"]);
      newCard = Object.assign({}, newCard, {card_id: card.id, count: 1});
      return actions.builderAddCardToDesk(newCard);
    }
  }

  handlePanelClick() {
    let {card, actions} = this.props;
    window.history.pushState(null, null, `/cards/${card.slug}`);
    return actions.fetchCard(card.slug).then(()=> {actions.openCardsModal(card);});
  }

  render() {
    let {card, desk} = this.props;
    let desk_card = findCardInDesk(card, desk);
    let style = {backgroundImage: `url(${card.img})`};
    return(
      <div className="column is-one-third-tablet is-one-third-desktop">
        <div className="hs-card__wrapper">
          <div className="hs-card__panel" onClick={this.handlePanelClick}>
            <a className="icon box is-marginless">
              <i className="fa fa-search"></i>
            </a>
          </div>
          <div className="hs-card" style={style} onClick={this.handleCardClick}/>
          {isFullDeskCard(desk_card) && <div className="hs-card__overlay is-overlay"/>}
          </div>
      </div>
    )
  }
}
