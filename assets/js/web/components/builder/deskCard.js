import React from 'react';
import PropTypes from 'prop-types';

class DeskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isShow: false };
    this.removeCard = this.removeCard.bind(this);
  }

  removeCard() {
    const { card } = this.props;
    const { remove, update } = this.props;
    const newCard = Object.assign({}, card, { count: card.count - 1 });
    return newCard.count > 0 ? update(newCard) : remove(newCard);
  }

  render() {
    const { card } = this.props;
    return (
      <div
        role="presentation"
        onMouseEnter={() => { this.setState({ isShow: true }); }}
        onMouseLeave={() => { this.setState({ isShow: false }); }}
        onClick={this.removeCard}
        className="media builder__desk-card"
      >

        {this.state.isShow &&
          <div className="box builder__desk-card-img">
            <img src={card.img} alt="" />
          </div>
        }

        <div className="media-left">
          <b className="builder__desk-card-cost">{card.cost}</b>
        </div>

        <div className="media-content">{card.title}</div>

        <div className="media-right">
          {card.rarity === 'Legendary' ?
            <span className="icon is-small">
              <i className="fa fa-star" />
            </span>
            : card.count
          }
        </div>
      </div>
    );
  }
}

DeskCard.propTypes = {
  remove: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  card: PropTypes.shape({
    cost: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rarity: PropTypes.string.isRequired,
  }).isRequired,
};

export default DeskCard;
