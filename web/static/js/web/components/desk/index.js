import React from "react";
import Desk from "./index/desk";
import Waypoint from "react-waypoint";
import KeywordFilter from "./index/keywordFilter";
import ClassFilter from "./index/classFilter";
import PopularityFilter from "./index/popularityFilter";

export default class IndexDesk extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: true}
    props.actions.initialFetchDesks().then(()=>{
      this.setState({isLoading: false})
    });
  }

  componentWillUnmount() {
    this.props.actions.clearDesks();
  }

  render() {
    const {index, filters} = this.props.store.desks;
    const {updateIndexDesk, setDeskModal, setModal, fetchDesk, fetchDesks, setDeskFilters} = this.props.actions;
    return(
      <div className="columns">
        <div className="column is-three-quarters">
          <div className="box">
            <h2 className="title">Desks</h2>
            <KeywordFilter
              filters={filters}
              fetch={fetchDesks}
              setFilters={setDeskFilters}
            />
            {index.map((desk)=> {
              return(<Desk
                update={updateIndexDesk}
                fetchDesk={()=> {
                  fetchDesk(desk.id).then(()=>{setDeskModal(true)})
                }}
                isLogin={this.props.store.user.is_authenticated}
                setModal={setModal}
                setDeskModal={setDeskModal}
                key={desk.id}
                desk={desk}/>)
            })}
          </div>
          <Waypoint onEnter={()=>{
            let {page, total_pages} = filters;
            if(!this.state.isLoading && page < total_pages) {
              let newFilters = Object.assign({}, filters, {page: page + 1})
              setDeskFilters(newFilters)
              this.setState({isLoading: true})
              fetchDesks(true).then(()=>{
                this.setState({isLoading: false})
              })
            }
          }} />
        </div>

        <div className="column">
          <div className="box">
            <ClassFilter
              filters={filters}
              fetch={fetchDesks}
              setFilters={setDeskFilters}
            />
            <hr/>
            <PopularityFilter
              filters={filters}
              fetch={fetchDesks}
              setFilters={setDeskFilters}
            />
          </div>
        </div>
      </div>
    )
  }
}
