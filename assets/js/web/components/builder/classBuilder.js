import React from 'react';
import _ from 'lodash';
import Builder from './builder';

export default class ClassBuilder extends React.Component {
  componentWillMount() {
    const player_class = _.capitalize(this.props.route.match.params.heroClass);
    const desk = _.merge({}, this.props.store.builder.desk, { player_class });
    this.props.actions.builderSetDesk(desk);
    if (_.isEmpty(this.props.store.builder.cards)) {
      const newFilters = Object.assign({}, this.props.store.builder.filters, { player_class });
      this.props.actions.builderSetFilters(newFilters);
      this.props.actions.builderFetchCards();
    }
  }

  componentWillUnmount() {
    this.props.actions.builderClear();
  }

  render() {
    const { actions, store, route } = this.props;
    const { builder, user } = store;
    return (
      <Builder
        route={route}
        user={user}
        builder={builder}
        mainAction={actions.builderSaveDesk}
        actions={actions}
      />
    );
  }
}
