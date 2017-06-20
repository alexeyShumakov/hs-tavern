import React from "react";
import Desk from "./desk";

export default (props) => {
  let desk = props.store.desks.show;
  let { setDesk, setModal } = props.actions;
  return(
    <div>
      <Desk setModal={setModal}
        desk={desk}
        update={setDesk}
        isLogin={props.store.user.is_authenticated}
      />
    </div>
  )
}
