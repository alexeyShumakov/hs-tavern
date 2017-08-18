import React from "react";
import {shallow} from "enzyme";
import CostFilter from "../../../../js/web/components/builder/costFilter";

function setup() {
  const props = {
    setFilters: jest.fn(),
    fetchCards: jest.fn(),
    field: "cost",
    filters: {
      cost: {min: 3, max: 4},
      pagination: {page: 1}
    }
  };
  const wrapper = shallow(<CostFilter {...props}/>);
  return {props, wrapper};
}
describe('components', () => {
  describe('builder CostFilter', () => {
    it('should render component', () => {
      const {props, wrapper} = setup();
      expect(wrapper.hasClass('slider-wrapper')).toBeTruthy();
    });

    it('it exec onChange callback correctly', () => {
      const {props, wrapper} = setup();
      wrapper.instance().handleChange([0, 7]);
      const newFilters = {cost:{min:0, max:7}, pagination:{page:1}};
      expect(props.setFilters).toBeCalledWith(newFilters);
    })

    it('it exec afterChange callback correctly', () => {
      const {props, wrapper} = setup();
      wrapper.setProps({filters:{cost:{min:0, max:7}, pagination:{page:2}}});
      wrapper.instance().handleAfterChange();
      const newFilters = {cost:{min:0, max:7}, pagination:{page:1}};
      expect(props.setFilters).toBeCalledWith(newFilters);
      expect(props.fetchCards).toBeCalled();
    });
  });
});
