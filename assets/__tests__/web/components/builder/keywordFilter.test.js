import React from 'react';
import { shallow } from 'enzyme';
import KeywordFilter from '../../../../js/web/components/builder/keywordFilter';

function setup() {
  const props = {
    fetchCards: jest.fn(),
    setFilters: jest.fn(),
    filters: {
      keyword: 'key',
      pagination: { page: 1 },
    },
  };
  const wrapper = shallow(<KeywordFilter {...props} />);
  return { wrapper, props };
}


describe('components', () => {
  describe('builder keywordFilter', () => {
    it('render correctly', () => {
      const { wrapper } = setup();
      expect(wrapper.hasClass('field')).toBeTruthy();
    });

    it('fire callback then user enters keyword', () => {
      const { props, wrapper } = setup();
      const input = wrapper.find('input');
      const expectedFilters = { keyword: 'foo', pagination: { page: 1 } };
      input.simulate('change', { target: { value: 'foo' } });
      expect(props.setFilters).toBeCalledWith(expectedFilters);
    });

    it('fire debounce callback(fetchCards)', () => {
      jest.useFakeTimers();
      const { props, wrapper } = setup();
      const input = wrapper.find('input');
      input.simulate('change', { target: { value: 'foo' } });
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(300);
      jest.runAllTimers();
      expect(props.fetchCards).toBeCalled();
    });
  });
});
