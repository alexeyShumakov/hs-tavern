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
  componentWillMount() {
    const player_class = _.capitalize(this.props.route.match.params.heroClass);
    const desk = _.merge({}, this.props.store.builder.desk, { player_class });
    this.props.actions.builderSetDesk(desk);
    if(_.isEmpty(this.props.store.builder.cards)) {
      const newFilters = Object.assign({}, this.props.store.builder.filters, {player_class})
      this.props.actions.builderSetFilters(newFilters);
      this.props.actions.builderFetchCards();
    }
  }

  componentWillUnmount() {
    this.props.actions.builderClear();
  }

  render() {
    let { desk, errors, isValid } = this.props.store.builder;
    let { cards } = desk;
    let deskCards = _.sortBy(cards, ["cost", "title"])
    return(
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box builder__search-cards">
            <div className="columns">

              <div className="column is-half">
                <KeywordFilter
                  filters={this.props.store.builder.filters}
                  fetchCards={this.props.actions.builderFetchCards}
                  setFilters={this.props.actions.builderSetFilters}
                />
              </div>

              <div className="column">
                <SetsFilter
                  setFilters={this.props.actions.builderSetFilters}
                  fetchCards={this.props.actions.builderFetchCards}
                  filters={this.props.store.builder.filters}
                />
              </div>

              <div className="column">
                <div className="slider-wrapper">
                  <CostFilter
                    field="cost"
                    classFilter="cost"
                    setFilters={this.props.actions.builderSetFilters}
                    fetchCards={this.props.actions.builderFetchCards}
                    filters={this.props.store.builder.filters}
                  />
                </div>
              </div>

            </div>

            <ClassFilter
              currentClass={this.props.store.builder.desk.player_class}
              selectedClass={this.props.store.builder.filters.player_class}
              callback={(player_class) => {
                let filters = Object.assign({}, this.props.store.builder.filters, {player_class})
                this.props.actions.builderSetFilters(filters)
                this.props.actions.builderFetchCards()
              }}
            />

            <div className="level">
              <div className="level-left">
                { this.props.store.builder.filters.pagination.page > 1 &&
                  <div className="level-item">
                    <a className="button"
                      onClick={()=>{
                        let f = this.props.store.builder.filters;
                        let filters = _.merge(f, {pagination:{page: f.pagination.page - 1}})
                        this.props.actions.builderSetFilters(filters)
                        this.props.actions.builderFetchCards()
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
                { this.props.store.builder.filters.pagination.page < this.props.store.builder.filters.pagination.total_pages &&
                  <a className="button"
                    onClick={()=>{
                      let f =this.props.store.builder.filters;
                      let filters = _.merge(f, {pagination:{page: f.pagination.page + 1}})
                      this.props.actions.builderSetFilters(filters)
                      this.props.actions.builderFetchCards()
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
              { this.props.store.builder.cards.map((card)=>{
                return(
                  <SearchCard
                    desk={desk}
                    key={card.id}
                    card={card}
                    actions={this.props.actions}
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
                    this.props.actions.builderSetDesk(newDesk)
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
                    this.props.actions.builderSetDesk(newDesk)
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
                      this.props.actions.builderSetDesk(newDesk)
                    }}
                  /> Standard
                </label>
              </p>
            </div>

            <Curve cards={cards} />
            <hr/>
            <div className="field">
              <button onClick={this.props.actions.builderSaveDesk}
                className="button is-primary is-fullwidth">
                <span>Save</span>
              </button>
            </div>
            <h3 className="title is-4">{desk.player_class}</h3>
            <h5 className="subtitle" href="">{_.sumBy(deskCards, 'count')}/30</h5>
            {deskCards.map((card)=>{
              return <DeskCard key={card.id} card={card} actions={this.props.actions} />
            })}
          </div>
        </div>
      </div>
    )
  }
}
