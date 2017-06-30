import React from "react";
import Desk from "./desk";
import createDeskChannel from "../../../channels/desk";

export default class DeskShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {channel: createDeskChannel(props.store.desks.show.id)}
  }

  componentWillMount() {
    let id = this.props.route.match.params.deskId;
    this.props.actions.initialFetchDesk();
  }
  componentWillUnmount() {
    this.state.channel.leave()
  }

  render() {
    let { store, actions, route } = this.props;
    let { setDesk, setModal } = actions;
    let desk = store.desks.show;
    return(
      <div>
        <Desk setModal={setModal}
          deleteCallback={()=>{
            let filters = {
              page: 1,
              total_pages: 1,
              keyword: "",
              player_class: "All",
              my: true
            }

            actions.deleteDesk(desk.id).then(()=>{
              actions.setDeskFilters(filters)
              actions.fetchDesks()
              route.history.push("/my_desks")
            })

          }}
          channel={this.state.channel}
          desk={desk}
          update={setDesk}
          isLogin={store.user.is_authenticated}
          store={store}
          actions={actions}
          route={route}
        />
      </div>
    )
  }
}
