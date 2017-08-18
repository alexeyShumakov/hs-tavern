import React from "react";
import {shallow} from "enzyme";
import Filter from "../../../../js/web/components/builder/classFilter";

function setup(selectedClass) {
  const props = {
    currentClass: "class",
    selectedClass: selectedClass,
    callback: jest.fn()
  };
  const comp = shallow(<Filter {...props}/>);
  return {props, comp};
};

describe("components",() => {
  it('should render component', () => {
    const {comp} = setup("class");
    expect(comp.hasClass('tabs')).toBeTruthy();
  });

  it('should have avctive neutral tab', () => {
    const {props, comp} = setup("Neutral");
    const tab = comp.find(".tabs > ul > li").at(1);
    expect(tab.hasClass('is-active')).toBeTruthy()
  });

  it('should have active hero-class-tab', () => {
    const {props, comp} = setup("foo");
    const classTab = comp.find(".tabs > ul > li").first();
    classTab.simulate('click');
    expect(props.callback).toBeCalledWith("class");
  });
});
