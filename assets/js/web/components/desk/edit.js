import React from "react";
import _ from "lodash";
import Builder from "../builder/builder";

export default class EditDesk extends React.Component {
  componentWillMount() {
    let {store, actions} = this.props;

    let desk = store.desks.show;
    if(!_.isEmpty(desk) && _.isEmpty(store.builder.cards)) {
      actions.builderSetDesk(desk);
      const newFilters = Object.assign({}, store.builder.filters, {player_class: desk.player_class})
      actions.builderSetFilters(newFilters);
      actions.builderFetchCards();
    }
  }

  componentWillUnmount() {
    this.props.actions.builderClear();
  }

  render() {
    let {actions, store, route} = this.props;
    let {builder, user} = store;
    return(
      <Builder
        route={route}
        user={user}
        builder={builder}
        mainAction={actions.builderUpdateServerDesk}
        actions={actions}/>
    )
  }
}
