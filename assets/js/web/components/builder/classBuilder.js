import React from 'react';
import _ from 'lodash';
import Builder from './builder';

export default class ClassBuilder extends React.Component {
  componentWillMount() {
    const { actions, store, route } = this.props;
    const { desk, filters, cards } = store.builder;
    const { builderSetDesk, builderSetFilters, builderFetchCards } = actions;
    const player_class = _.capitalize(route.match.params.heroClass);
    const newDesk = _.merge({}, desk, { player_class });
    builderSetDesk(newDesk);
    if (_.isEmpty(cards)) {
      const newFilters = Object.assign({}, filters, { player_class });
      builderSetFilters(newFilters);
      builderFetchCards();
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
