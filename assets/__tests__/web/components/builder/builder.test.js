import React from 'react';
import { shallow } from 'enzyme';
import Builder from '../../../../js/web/components/builder/builder';
import Filters from '../../../../js/web/components/builder/filters';
import CardsBlock from '../../../../js/web/components/builder/cardsBlock';
import Curve from '../../../../js/web/components/builder/costCurve';
import DeskCard from '../../../../js/web/components/builder/deskCard';
import DescriptionEditor from '../../../../js/web/components/builder/descriptionEditor';

function setup() {
  const props = {
    ueser: {
      is_authenticated: true
    },
    builder: {
      cards: [
        { id: 1, title: 'foo' },
      ],
      desk: {
        description: 'foo',
        player_class: 'Druid',
        standard: true,
        title: '',
        cards: [
          { cost: 1, card_id: 1, count: 1, img: 'http://img.address', title: 'foo title', rarity: 'Common' },
          { cost: 1, card_id: 2, count: 2, img: 'http://img.address', title: 'foo title', rarity: 'Common' },
        ],
      },
      errors: {},
      isValid: true,
      filters: {
        player_class: 'druid',
        pagination: { page: 1 } },
    },
    mainAction: jest.fn(),
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
  };
  const wrapper = shallow(<Builder {...props} />);
  return { wrapper, props };
}

describe('component', () => {
  describe('builder Builder', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('columns')).toBeTruthy();
      expect(wrapper.find('h5.subtitle').text()).toBe('3/30');
      expect(wrapper.find('h3.is-4.title').text()).toBe('Druid');
      expect(wrapper.find(DeskCard).length).toBe(2);
      [Filters, CardsBlock, Curve, DescriptionEditor]
        .forEach((className) => {
          expect(wrapper.find(className).exists()).toBeTruthy();
        });
    });
  });
});
