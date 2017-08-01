import React from "react";

export default class Curve extends React.Component {
  render() {
    let {cards} = this.props;
    let  curve = [
      {label: 0, cards: cards.filter((card) => {return card.cost == 0}) },
      {label: 1, cards: cards.filter((card) => {return card.cost == 1}) },
      {label: 2, cards: cards.filter((card) => {return card.cost == 2}) },
      {label: 3, cards: cards.filter((card) => {return card.cost == 3}) },
      {label: 4, cards: cards.filter((card) => {return card.cost == 4}) },
      {label: 5, cards: cards.filter((card) => {return card.cost == 5}) },
      {label: 6, cards: cards.filter((card) => {return card.cost == 6}) },
      {label: "7+", cards: cards.filter((card) => {return card.cost >= 7}) },
    ].map((curveItem)=>{ return Object.assign({}, curveItem, {count: _.sumBy(curveItem.cards, 'count') })})

    let maxCurve = _.maxBy(curve, 'count').count;

    let curveSizes = curve.map((curveItem)=> {
      return Object.assign({}, curveItem, {height: maxCurve > 0 && ((curveItem.count/maxCurve) * 100) || 0});
    })
    return(
      <div>
        {curveSizes.map((curveItem, i) => {
            return(
          <div  key={i} className="is-pulled-left builder__curve-item-wrapper has-text-centered">
            <span>{curveItem.count}</span>
            <div className="builder__curve-item-box" >
              <div  className="builder__curve-item" style={{height: `${curveItem.height}%`}}></div>
            </div>
            <span>{curveItem.label}</span>
          </div>
          )
        })}
        <div className="is-clearfix"></div>
      </div>
    )
  }
}
