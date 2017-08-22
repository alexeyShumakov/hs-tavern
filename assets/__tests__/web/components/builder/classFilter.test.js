import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../../../../js/web/components/builder/classFilter';

function setup(selectedClass) {
  const props = {
    currentClass: 'class',
    callback: jest.fn(),
    selectedClass,
  };
  const comp = shallow(<Filter {...props} />);
  return { props, comp };
}

describe('components', () => {
  it('should render component', () => {
    const { comp } = setup('class');
    expect(comp.hasClass('tabs')).toBeTruthy();
  });

  it('should have avctive neutral tab', () => {
    const { comp } = setup('Neutral');
    const tab = comp.find('li').at(1);
    expect(tab.hasClass('is-active')).toBeTruthy();
  });

  it('should have active hero-class-tab', () => {
    const { props, comp } = setup('class');
    const classTab = comp.find('a').first();
    classTab.simulate('click');
    expect(props.callback).toBeCalledWith('class');
  });
});
