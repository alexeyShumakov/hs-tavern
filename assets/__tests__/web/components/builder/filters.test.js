import React from 'react';
import { shallow } from 'enzyme';
import Filters from '../../../../js/web/components/builder/filters';
import ClassFilter from '../../../../js/web/components/builder/classFilter';
import CostFilter from '../../../../js/web/components/builder/costFilter';
import KeywordFilter from '../../../../js/web/components/builder/keywordFilter';
import SetsFilter from '../../../../js/web/components/builder/setsFilter';

function setup() {
  const props = {
    filters: {},
    currentClass: 'class',
    selectedClass: 'class',
    fetchCards: jest.fn(),
    setFilters: jest.fn(),
  };

  const wrapper = shallow(<Filters {...props} />);
  return { wrapper, props };
}

describe('component', () => {
  describe('builder Builder', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('builder-filters')).toBeTruthy();
      [ClassFilter, CostFilter, KeywordFilter, SetsFilter]
        .forEach((className) => {
          expect(wrapper.find(className).exists()).toBeTruthy();
        });
    });
  });
});
