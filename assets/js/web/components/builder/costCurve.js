import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Curve extends React.Component {
  render() {
    const { cards } = this.props;
    const curve = [
      { label: 0, cards: cards.filter(card => card.cost === 0) },
      { label: 1, cards: cards.filter(card => card.cost === 1) },
      { label: 2, cards: cards.filter(card => card.cost === 2) },
      { label: 3, cards: cards.filter(card => card.cost === 3) },
      { label: 4, cards: cards.filter(card => card.cost === 4) },
      { label: 5, cards: cards.filter(card => card.cost === 5) },
      { label: 6, cards: cards.filter(card => card.cost === 6) },
      { label: '7+', cards: cards.filter(card => card.cost >= 7) },
    ].map(curveItem => Object.assign({}, curveItem, { count: _.sumBy(curveItem.cards, 'count') }));

    const maxCurve = _.maxBy(curve, 'count').count;

    const curveSizes = curve.map((curveItem) => {
      const height = maxCurve > 0 ? ((curveItem.count / maxCurve) * 100) : 0;
      return Object.assign({}, curveItem, { height });
    });
    return (
      <div>
        { curveSizes.map(curveItem => (
          <div
            key={curveItem.label}
            className="is-pulled-left builder__curve-item-wrapper has-text-centered"
          >
            <span>{curveItem.count}</span>
            <div className="builder__curve-item-box" >
              <div className="builder__curve-item" style={{ height: `${curveItem.height}%` }} />
            </div>
            <span>{curveItem.label}</span>
          </div>
        ))}
        <div className="is-clearfix" />
      </div>
    );
  }
}

Curve.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default Curve;
