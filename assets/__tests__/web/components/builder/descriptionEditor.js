import React from 'react';
import { shallow } from 'enzyme';
import Editor from '../../../../js/web/components/builder/descriptionEditor';

function setup() {
  const props = {
    desk: { description: 'bar' },
    builderSetDesk: jest.fn(),
  };
  const comp = shallow(<Editor {...props} />);
  return { props, comp };
}

describe('components', () => {
  it('render correctly', () => {
    const { comp } = setup();
    expect(comp.hasClass('box')).toBeTruthy();
    expect(comp.find('textarea').exists()).toBeTruthy();
    expect(comp.find('textarea').prop('value')).toBe('bar');
  });

  it('textarea onChange', () => {
    const { props, comp } = setup();
    comp.find('textarea').simulate('change', { target: { value: 'foo' } });
    expect(props.builderSetDesk).toBeCalledWith({ description: 'foo' });
  });
});
