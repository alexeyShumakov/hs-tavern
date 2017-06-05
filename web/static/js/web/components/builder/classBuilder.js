import React from "react";
import Slider, { Range } from "rc-slider";
import ClassFilter from "./classFilter";
import CostFilter from "./costFilter";
import KeywordFilter from "./keywordFilter";
import SetsFilter from "./setsFilter";
import axios from "../../utils/axios";
import _ from "lodash";

export default class Builder extends React.Component {
  componentWillMount() {
    const player_class = _.capitalize(this.props.route.match.params.heroClass);
    const desk = { player_class }
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
    return(
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box">
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
                  <div key={card.id} className="column is-one-third-tablet is-one-third-desktop">
                    <img src={card.img} alt=""/>
                  </div>
                )
              })
              }

            </div>
            <div className="columns">
              <div className="column">
                <nav className="pagination">
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="box">
            <div className="field">
              <p className="control">
                <input className="input" type="text" placeholder="Desk title"/>
              </p>
            </div>
          </div>
          <div className="box">
            <aside className="menu">
              <ul className="menu-list">
                <li><a>Card 1</a></li>
                <li><a>Card 2</a></li>
                <li><a>Card 1</a></li>
                <li><a>Card 1</a></li>
                <li><a>Card 1</a></li>
                <li><a>Card 2</a></li>
                <li><a>Card 2</a></li>
                <li><a>Card 2</a></li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    )
  }
}
