import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Filters from './filters';
import CardsBlock from './cardsBlock';
import DeskCard from './deskCard';
import Curve from './costCurve';
import Errors from './errorsNotification';
import DescriptionEditor from './descriptionEditor';

class Builder extends React.Component {
  render() {
    const { mainAction, user, builder, actions, route } = this.props;
    const { builderSetDesk, builderValidateDesk, builderRemoveCard, builderUpdateDeskCard,
      builderFetchCards, builderSetFilters, setModal } = actions;
    const { desk, errors, isValid, filters, cards } = builder;
    return (
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box builder__search-cards">
            <Filters
              filters={filters}
              setFilters={builderSetFilters}
              fetchCards={builderFetchCards}
              currentClass={desk.player_class}
              selectedClass={filters.player_class}
            />
            <CardsBlock
              fetchCards={builderFetchCards}
              setFilters={builderSetFilters}
              {...{ filters, cards, actions, desk }}
            />
          </div>

          <DescriptionEditor {...{ builderSetDesk, desk }} />
        </div>

        <div className="column">
          {!isValid && <Errors errors={errors} isValid={isValid} />}
          <div className="box">
            <div className="field">
              <p className="control">
                <input
                  value={desk.title}
                  onChange={(e) => {
                    const newDesk = Object.assign({}, desk, { title: e.target.value });
                    builderSetDesk(newDesk);
                  }}
                  className="input"
                  type="text"
                  placeholder="Desk title"
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={desk.standard}
                    onChange={(e) => {
                      const newDesk = Object.assign({}, desk, { standard: e.target.checked });
                      builderSetDesk(newDesk);
                    }}
                  /> Standard
                </label>
              </p>
            </div>

            <Curve cards={desk.cards} />
            <hr />

            <div className="field">
              <button
                className="button is-primary is-fullwidth"
                onClick={() => {
                  if (!user.is_authenticated) {
                    return setModal(true);
                  }
                  builderValidateDesk();
                  return mainAction().then((response) => {
                    const id = response.data.id;
                    actions.fetchDesk(id).then(() => {
                      route.history.push(`/desks/${id}`);
                    });
                  }, () => {});
                }}
              >
                <span>Save</span>
              </button>
            </div>
            <h3 className="title is-4">{desk.player_class}</h3>
            <h5 className="subtitle">{_.sumBy(desk.cards, 'count')}/30</h5>
            { desk.cards.map(card => (
              <DeskCard key={card.card_id} card={card} remove={builderRemoveCard} update={builderUpdateDeskCard} />
            ))
            }
          </div>
        </div>
      </div>
    );
  }
}
Builder.propTypes = {
  mainAction: PropTypes.func.isRequired,
  builder: PropTypes.shape({
    desk: PropTypes.shape({
      title: PropTypes.string.isRequired,
      cards: PropTypes.array.isRequired,
      player_class: PropTypes.string.isRequired,
      standard: PropTypes.bool.isRequired
    }),
    errors: PropTypes.object.isRequired,
    isValid: PropTypes.bool.isRequired,
    filters: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired
  }),

  user: PropTypes.shape({
    is_authenticated: PropTypes.bool.isRequired
  }),
  actions: PropTypes.shape({
    builderRemoveCard: PropTypes.func.isRequired,
    builderUpdateDeskCard: PropTypes.func.isRequired,
    builderSetDesk: PropTypes.func.isRequired,
    builderValidateDesk: PropTypes.func.isRequired,
    builderFetchCards: PropTypes.func.isRequired,
    builderSetFilters: PropTypes.func.isRequired,
    setModal: PropTypes.func.isRequired
  }),

};

export default Builder;
