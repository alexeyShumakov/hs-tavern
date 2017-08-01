import React from "react";
import Slider, { Range } from "rc-slider";
import ClassFilter from "./classFilter";
import CostFilter from "./costFilter";
import KeywordFilter from "./keywordFilter";
import SetsFilter from "./setsFilter";
import axios from "../../utils/axios";
import _ from "lodash";
import SearchCard from "./searchCard";
import DeskCard from "./deskCard";
import Curve from "./costCurve";
import Errors from "./errorsNotification";

export default class Builder extends React.Component {
  render() {
    let {mainAction, user, builder, actions, route} = this.props;
    let { builderSetDesk, builderSaveDesk, builderValidateDesk, builderFetchCards, builderSetFilters } = actions;
    const { desk, errors, isValid, filters } = builder;
    let builderCards = builder.cards;
    let { cards } = desk;
    let deskCards = _.sortBy(cards, ["cost", "title"])
    return(
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box builder__search-cards">
            <div className="columns">

              <div className="column is-half">
                <KeywordFilter
                  filters={filters}
                  fetchCards={builderFetchCards}
                  setFilters={builderSetFilters}
                />
              </div>

              <div className="column">
                <SetsFilter
                  filters={filters}
                  fetchCards={builderFetchCards}
                  setFilters={builderSetFilters}
                />
              </div>

              <div className="column">
                <div className="slider-wrapper">
                  <CostFilter
                    field="cost"
                    classFilter="cost"
                    filters={filters}
                    fetchCards={builderFetchCards}
                    setFilters={builderSetFilters}
                  />
                </div>
              </div>

            </div>

            <ClassFilter
              currentClass={desk.player_class}
              selectedClass={filters.player_class}
              callback={(player_class) => {
                builderSetFilters(Object.assign({}, filters, {player_class}))
                builderFetchCards()
              }}
            />

            <div className="level">
              <div className="level-left">
                { filters.pagination.page > 1 &&
                  <div className="level-item">
                    <a className="button"
                      onClick={()=>{
                        let newFilters = _.merge(filters, {pagination:{page: filters.pagination.page - 1}})
                        builderSetFilters(newFilters)
                        builderFetchCards()
                      }}
                    >
                      <span className="icon">
                        <i className="fa fa-chevron-left"></i>
                      </span>
                    </a>
                  </div>
                }
              </div>

              <div className="level-right">
                <div className="level-item">
                { filters.pagination.page < filters.pagination.total_pages &&
                  <a className="button"
                    onClick={()=>{
                      let newFilters = _.merge(filters, {pagination:{page: filters.pagination.page + 1}})
                      builderSetFilters(newFilters)
                      builderFetchCards()
                    }}
                  >
                    <span className="icon">
                      <i className="fa fa-chevron-right"></i>
                    </span>
                  </a>
                }
                </div>
              </div>
            </div>

            <div className="columns is-multiline">
              { builderCards.map((card)=>{
                return(
                  <SearchCard
                    desk={desk}
                    key={card.id}
                    card={card}
                    actions={actions}
                  />)
              })}
            </div>

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
                      builderSetDesk(newDesk)
                    }}
                  /> Standard
                </label>
              </p>
            </div>

            <Curve cards={cards} />
            <hr/>
            <div className="field">
              <button onClick={()=> {
                if(!user.is_authenticated)
                  return actions.setModal(true)

                builderValidateDesk()
                mainAction().then((response)=>{
                  let id = response.data.id
                  actions.fetchDesk(id).then(()=>{
                    route.history.push(`/desks/${id}`);
                  })
                }, ()=>{})
              }}
                className="button is-primary is-fullwidth">
                <span>Save</span>
              </button>
            </div>
            <h3 className="title is-4">{desk.player_class}</h3>
            <h5 className="subtitle" href="">{_.sumBy(deskCards, 'count')}/30</h5>
            {deskCards.map((card)=>{
              return <DeskCard key={card.card_id} card={card} actions={actions} />
            })}
          </div>
        </div>
      </div>
    )
  }
}
