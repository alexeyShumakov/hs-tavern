import React from 'react';
import {shallow} from 'enzyme';
import SetsFilter from '../../../../js/web/components/builder/setsFilter';

function setup() {
  const props = {
    filters: {
      pagination: {page: 2},
      set: 'All'
    },
    setFilters: jest.fn(),
    fetchCards: jest.fn()
  };
  const wrapper = shallow(<SetsFilter {...props}/>);
  return {props, wrapper};
};

describe('components', () => {
  describe('builder setsFilter', () => {
    it('render correctly', () => {
      const {wrapper} = setup();
      expect(wrapper.hasClass('field')).toBeTruthy();
    });

    it('exec callaback after changes', () => {
      const {props, wrapper} = setup();
      wrapper.find('select').simulate('change', {target:{value: 'Basic'}});
      const expectdFilters = {pagination: {page: 1}, set: 'Basic'};

      expect(props.setFilters).toBeCalledWith(expectdFilters);
      expect(props.fetchCards).toBeCalled();
    });
  });
});
