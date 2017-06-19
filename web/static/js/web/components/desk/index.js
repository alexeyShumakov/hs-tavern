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
    const {index} = this.props.store.desks;
    const {updateIndexDesk, setDeskModal, setModal, fetchDesk} = this.props.actions;
    return(
      <div>desk index
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
    )
  }
}
