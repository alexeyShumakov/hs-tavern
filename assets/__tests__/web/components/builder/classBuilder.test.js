import React from 'react';
import { shallow } from 'enzyme';
import Comp from '../../../../js/web/components/builder/classBuilder';
import Builder from '../../../../js/web/components/builder/builder';

function setup() {
  const props = {
    store: {
      builder: {
        cards: [],
        desk: {
          description: 'foo',
          player_class: '',
          standard: true,
          title: '',
          cards: [],
        },
        errors: {},
        isValid: true,
        filters: {
          player_class: 'druid',
          pagination: { page: 1 } },
      },
    },
    actions: {
      setModal: jest.fn(),
      builderSetDesk: jest.fn(),
      builderSaveDesk: jest.fn(),
      builderValidateDesk: jest.fn(),
      builderFetchCards: jest.fn(),
      builderSetFilters: jest.fn(),
      builderRemoveCard: jest.fn(),
      builderUpdateDeskCard: jest.fn(),
    },
    route: {
      match: {
        params: {
          heroClass: 'druid'
        }
      }
    }
  };

  const comp = shallow(<Comp {...props} />)

  return { props, comp };
};

describe('components', () => {
  describe('builder classBuilder', () => {
    it('render correctly', () => {
      const {comp} = setup();
      expect(comp.find(Builder).exists()).toBeTruthy();
    });
    it('call functions on component will mount', () => {
      const {props} = setup();
      const newDesk = Object.assign({}, props.store.builder.desk, {player_class: 'Druid'});
      expect(props.actions.builderSetDesk).toBeCalledWith(newDesk);
      expect(props.actions.builderSetFilters).toBeCalledWith({player_class: 'Druid', pagination: { page: 1 }});
      expect(props.actions.builderFetchCards).toBeCalled();
    });
  });
});
