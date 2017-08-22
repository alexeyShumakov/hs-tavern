import React from "react";
import _ from "lodash";

import Filters from "./filters";
import CardsBlock from "./cardsBlock";
import DeskCard from "./deskCard";
import Curve from "./costCurve";
import Errors from "./errorsNotification";

export default class Builder extends React.Component {
  render() {
    let {mainAction, user, builder, actions, route} = this.props;
    let { builderSetDesk, builderSaveDesk, builderValidateDesk, builderFetchCards, builderSetFilters } = actions;
    const { desk, errors, isValid, filters, cards } = builder;
    return(
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
              {...{filters, cards, actions, desk}}
            />
          </div>

          <div className="box">
            <h2 className="title is-4">Description</h2>
            <div className="field">
              <p className="control">
                <textarea
                  value={desk.description}
                  onChange={(e)=> {
                    let newDesk =Object.assign({}, desk, {description: e.target.value})
                    builderSetDesk(newDesk)
                  }}
                  className="textarea"
                  placeholder="Textarea">
                </textarea>
              </p>
            </div>
          </div>
        </div>

        <div className="column">
          {!isValid && <Errors errors={errors} isValid={isValid} />}
          <div className="box">
            <div className="field">
              <p className="control">
                <input
                  value={desk.title}
                  onChange={(e)=> {
                    let newDesk =Object.assign({}, desk, {title: e.target.value})
                    builderSetDesk(newDesk)
                  }}
                  className="input"
                  type="text"
                  placeholder="Desk title"/>
              </p>
            </div>

            <div className="field">
              <p className="control">
                <label className="checkbox">
                  <input type="checkbox"
                    checked={desk.standard}
                    onChange={(e)=>{
                      let newDesk =Object.assign({}, desk, {standard: e.target.checked})
                      builderSetDesk(newDesk);
                    }}
                  /> Standard
                </label>
              </p>
            </div>

            <Curve cards={desk.cards} />
            <hr/>

            <div className="field">
              <button onClick={()=> {
                if(!user.is_authenticated)
                  return actions.setModal(true)

                builderValidateDesk()
                mainAction().then((response)=>{
                  let id = response.data.id
                  actions.fetchDesk(id).then(() => {
                    route.history.push(`/desks/${id}`);
                  })
                }, ()=>{})
              }}
                className="button is-primary is-fullwidth">
                <span>Save</span>
              </button>
            </div>
            <h3 className="title is-4">{desk.player_class}</h3>
            <h5 className="subtitle">{_.sumBy(desk.cards, 'count')}/30</h5>
            {desk.cards.map((card)=>{
               return(
                 <DeskCard
                   key={card.card_id}
                   card={card}
                   remove={actions.builderRemoveCard}
                   update={actions.builderUpdateDeskCard}
                 />
               )
            })}
          </div>
        </div>
      </div>
    )
  }
}
