import React from 'react';
import { shallow } from 'enzyme';
import DeskErrors from '../../../../js/web/components/builder/errorsNotification';

describe('components', () => {
  describe('builder errorsNotification', () => {
    it('show errors', () => {
      const props = { errors: { foo: 'error 0', bar: 'error 1' } };
      const component = shallow(<DeskErrors {...props} />);
      const errors = component.find('ul > li');
      [0, 1].forEach((i) => {
        expect(errors.at(i).text()).toBe(`error ${i}`);
      });
    });
  });
});
