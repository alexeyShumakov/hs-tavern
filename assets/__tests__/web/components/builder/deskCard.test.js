import React from "react";
import {shallow} from "enzyme";
import DeskCard from "../../../../js/web/components/builder/deskCard";

function setup() {
  const props = {
    remove: jest.fn(),
    update: jest.fn(),
    card: {
      cost: 1,
      count: 2,
      img: "http://img.address",
      title: "foo title",
      rarity: "Common"
    }
  };

  const wrapper = shallow(<DeskCard {...props}/>);
  return {props, wrapper};
}

describe("components", () => {
  describe("builder DeskCard", () => {
    it('render component', () => {
      const {wrapper, props} = setup();
      expect(wrapper.hasClass('builder__desk-card')).toBeTruthy();
      expect(wrapper.find('.media-content').text()).toBe('foo title');
      expect(wrapper.find('.builder__desk-card-cost').text()).toBe('1');
    });

    it('show legendary information correctly', () => {
      const {wrapper, props} = setup();
      const newCard = Object.assign({}, props.card, {rarity: "Legendary"});
      expect(wrapper.find('.media-right').text()).toBe('2');
      wrapper.setProps({card: newCard});
      expect(wrapper.find('.media-right .fa-star').exists()).toBeTruthy();
    });

    it('update cards count then user click to comp', () =>{
      const {wrapper, props} = setup();
      const newCard = Object.assign({}, props.card, {count: 1});
      wrapper.simulate('click');
      expect(props.update).toBeCalledWith(newCard);
    });

    it('remove card then user click to comp', () =>{
      const {wrapper, props} = setup();
      const newCard = Object.assign({}, props.card, {count: 1});
      wrapper.setProps({card: newCard});
      wrapper.simulate('click');
      const deletedCard = Object.assign({}, props.card, {count: 0});
      expect(props.remove).toBeCalledWith(deletedCard);
    });

    it('toggle isShow state and show img', () => {
      const {wrapper, props} = setup();
      expect(wrapper.state('isShow')).toBeFalsy();
      wrapper.simulate('mouseEnter');
      expect(wrapper.state('isShow')).toBeTruthy();
      expect(wrapper.find('.builder__desk-card-img').exists()).toBeTruthy();
      expect(wrapper.find('.builder__desk-card-img > img').prop('src')).toBe('http://img.address');
      wrapper.simulate('mouseLeave');
      expect(wrapper.state('isShow')).toBeFalsy();
    });
  });
});
