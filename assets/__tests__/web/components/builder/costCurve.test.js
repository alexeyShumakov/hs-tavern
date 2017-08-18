import React from "react";
import {shallow} from "enzyme";
import CostCurve from "../../../../js/web/components/builder/costCurve";

function setup() {
  const props = {
    cards: [
      {cost: 0, count: 1},
      {cost: 0, count: 2},
      {cost: 7, count: 2},
      {cost: 8, count: 2}
    ]
  };
  const wrapper = shallow(<CostCurve {...props}/>);
  return {props, wrapper};
}

describe('components', () => {
  describe('builder CostCurve', () => {
    it('render correct curve', () => {
      const {wrapper} = setup();
      const curveItems = wrapper.find('.builder__curve-item-wrapper');
      expect(curveItems.length).toBe(8);
    });

    it('calculate count per cost correctly', () => {
      const {wrapper} = setup();
      const curveItems = wrapper.find('.builder__curve-item-wrapper');
      [{cost: 0, expectedCount: '3'}, {cost: 1, expectedCount: '0'}, {cost: 7, expectedCount: '4'}]
        .forEach(({cost, expectedCount}) => {
          expect(curveItems.at(cost).find('span').first().text()).toBe(expectedCount);
        });
    });

    it('calculate height per cost correctly', () => {
      const {wrapper} = setup();
      const curveItems = wrapper.find('.builder__curve-item');
      [{cost: 0, expectedHeight: 75}, {cost: 1, expectedHeight: 0}, {cost: 7, expectedHeight: 100}]
        .forEach(({cost, expectedHeight}) => {
          const el = `<div class=\"builder__curve-item\" style=\"height:${expectedHeight}%;\"></div>`;
          expect(curveItems.at(cost).html()).toBe(el);
        });
    });
  });
});
