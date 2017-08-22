import React from 'react';
import { shallow } from 'enzyme';
import CardsBlock from '../../../../js/web/components/builder/cardsBlock';
import SearchCard from '../../../../js/web/components/builder/searchCard';

function setup(currentPage = 2) {
  const props = {
    filters: {
      pagination: { page: currentPage, total_pages: 3 },
    },
    actions: {
      builderUpdateDeskCard: jest.fn(),
      builderAddCardToDesk: jest.fn(),
      fetchCard: jest.fn(),
      openCardsModal: jest.fn(),
    },
    cards: [{ id: 1, title: 'foo' }, { id: 2, title: 'bar' }],
    desk: {},
    fetchCards: jest.fn(),
    setFilters: jest.fn(),
  };
  const wrapper = shallow(<CardsBlock {...props} />);
  return { wrapper, props };
}

describe('component', () => {
  describe('builder Builder', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('cards-block')).toBeTruthy();
      expect(wrapper.find('.button').length).toBe(2);
      expect(wrapper.find(SearchCard).length).toBe(2);
    });

    it('update pagination filter, fetch cards', () => {
      const { props, wrapper } = setup();
      const newFilters = { pagination: { page: 1, total_pages: 3 } };
      wrapper.find('.button').at(0).simulate('click');
      expect(props.setFilters).toBeCalledWith(newFilters);
      expect(props.fetchCards).toBeCalled();
    });

    it('hidden left arrow', () => {
      const { wrapper } = setup(1);
      expect(wrapper.find('.fa-chevron-left').exists()).toBeFalsy();
      expect(wrapper.find('.fa-chevron-right').exists()).toBeTruthy();
    });

    it('hidden right arrow', () => {
      const { wrapper } = setup(3);
      expect(wrapper.find('.fa-chevron-left').exists()).toBeTruthy();
      expect(wrapper.find('.fa-chevron-right').exists()).toBeFalsy();
    });

    it('update pagination filter, fetch cards, and hide right button', () => {
      const { props, wrapper } = setup();
      const newFilters = { pagination: { page: 3, total_pages: 3 } };
      wrapper.find('.button').at(1).simulate('click');
      expect(props.fetchCards).toBeCalled();
      expect(props.setFilters).toBeCalledWith(newFilters);
    });
  });
});
