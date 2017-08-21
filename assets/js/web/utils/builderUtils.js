import _ from "lodash";

export function isFullDesk(desk) {
  return _.sumBy(desk.cards, 'count') >= 30;
}

export function findCardInDesk(card, desk) {
  return desk.cards.find((desk_card)=>{
    return desk_card.card_id == card.id;
  });
}

export function checkCard(card) {
  return card.rarity != "Legendary" && card.count < 2;
}

export function isFullDeskCard(card) {
  return card && (card.rarity == "Legendary" || card.count >= 2);
}
