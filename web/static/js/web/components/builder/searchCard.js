import React from "react";
import _ from "lodash";

export default class SearchCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { card, desk } = this.props;
    let { fetchCard, builderUpdateDeskCard, builderAddCardToDesk } = this.props.actions;
    let desk_card = findCard(card, desk);
    let style = {
      backgroundImage: `url(${card.img})`
    }
    return(
      <div className="column is-one-third-tablet is-one-third-desktop">
        <div className="hs-card__wrapper">
          <div className="hs-card__panel"
              onClick={()=>{
              window.history.pushState(null, null, `/cards/${card.slug}`);
              fetchCard(card.slug).then(()=> {
                this.props.actions.openCardsModal(card);
              })
          }}>

            <a className="icon box is-marginless">
              <i className="fa fa-search"></i>
            </a>
          </div>
          <div className="hs-card" style={style}
            onClick={()=>{
              let newCard = _.pick(card, ["img", "cost", "rarity", "title"])
              newCard = Object.assign({}, newCard, {card_id: card.id, count: 1})
              !ifFullDesk(desk) &&
                (desk_card && builderUpdateDeskCard(getCard(desk_card))
                  || builderAddCardToDesk(newCard))
            }}/>
          {isFull(desk_card) && <div className="hs-card__overlay is-overlay"/> }
          </div>
      </div>
    )
  }
}

function ifFullDesk(desk) {
  return _.sumBy(desk.cards, 'count') >= 30
}
function findCard(card, desk) {
  return desk.cards.find((desk_card)=>{
    return desk_card.card_id == card.id
  })
}
function getCard(card) {
  return card.rarity != "Legendary"
    && card.count < 2
    && Object.assign({}, card, {count: card.count + 1}) || card

}

function isFull(card) {
  return card && (card.rarity == "Legendary" || card.count >= 2)
}
