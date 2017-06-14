import React from "react";
import Desk from "./index/desk";

export default class IndexDesk extends React.Component {

  constructor(props) {
    super(props);
    props.actions.fetchDesks();
  }

  componentWillUnmount() {
    this.props.actions.clearDesks();
  }

  render() {
    const desks = this.props.store.desks.index;
    return(
      <div>desk index
        {desks.map((desk)=> {
          return <Desk key={desk.id} desk={desk}/>
        })}
      </div>
    )
  }
}
