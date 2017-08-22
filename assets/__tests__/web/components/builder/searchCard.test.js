import React from 'react';
import { shallow } from 'enzyme';
import SearchCard from '../../../../js/web/components/builder/searchCard';

function setup(id = 1, rarity = 'Common') {
  const props = {
    card: {
      id,
      rarity,
      title: 'foo title',
      slug: 'foo-title',
      cost: 2,
      img: 'https://img.com/img.jpg',
    },
    desk: {
      cards: [
        { card_id: 1, count: 1 },
        { card_id: 2, count: 2 },
      ],
    },
    actions: {
      fetchCard: jest.fn(() => Promise.resolve()),
      builderUpdateDeskCard: jest.fn(),
      builderAddCardToDesk: jest.fn(),
      openCardsModal: jest.fn(),
    },
  };

  const wrapper = shallow(<SearchCard {...props} />);
  return { props, wrapper };
}

describe('components', () => {
  describe('builder SearchCard', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('column')).toBeTruthy();
    });

    it('overlay then isFull', () => {
      const { wrapper } = setup(2);
      const overlay = wrapper.find('.hs-card__overlay');
      expect(overlay.exists()).toBeTruthy();
    });

    it('handleCardClick, add card', () => {
      const { wrapper, props } = setup(3);
      wrapper.instance().handleCardClick();
      const expectedVal = {
        title: 'foo title',
        rarity: 'Common',
        img: 'https://img.com/img.jpg',
        cost: 2,
        card_id: 3,
        count: 1,
      };
      expect(props.actions.builderAddCardToDesk).toBeCalledWith(expectedVal);
    });

    it('handleCardClick, update card', () => {
      // count == 1, rarity = "common"
      const { wrapper, props } = setup();
      wrapper.instance().handleCardClick();
      expect(props.actions.builderUpdateDeskCard).toBeCalledWith({ card_id: 1, count: 2 });
    });

    it('handleCardClick, not called callback', () => {
      // count == 2, rarity = "common"
      const { wrapper, props } = setup(2);
      wrapper.instance().handleCardClick();
      expect(props.actions.builderUpdateDeskCard.mock.calls.length).toBe(0);
      expect(props.actions.builderAddCardToDesk.mock.calls.length).toBe(0);
    });

    it('handlePanelClick', (done) => {
      const { wrapper, props } = setup();
      const pushState = window.history.pushState = jest.fn();
      wrapper.instance().handlePanelClick().then(() => {
        expect(props.actions.fetchCard).toBeCalledWith('foo-title');
        expect(props.actions.openCardsModal).toBeCalledWith(props.card);
        expect(pushState).toBeCalled();
        done();
      });
    });
  });
});
