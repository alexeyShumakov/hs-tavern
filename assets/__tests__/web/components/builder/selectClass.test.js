import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import SelectClass from '../../../../js/web/components/builder/selectClass';

describe('components', () => {
  describe('builder SelectClass', () => {
    it('render correctly', () => {
      const wrapper = shallow(<SelectClass />);
      expect(wrapper.find('.card').length).toBe(9);
      expect(wrapper.find('.card-image').length).toBe(9);
      expect(wrapper.find('h1').text()).toBe('Choose your way');
      expect(wrapper.find(Link).length).toBe(18);
    });
  });
});
