import {expect} from 'chai'
import React from 'react'
import {shallow, mount} from  'enzyme'
import App from '../js/components/App.jsx'

describe("<App/>", function(){
  it("renders the component", function(){
    const component = shallow(<App />)
    console.log(component.debug())
    expect(component.contains(<h1>Hello World!</h1>)).to.be.true
  });

  it("changes state correctly", function(){
    const component = mount(<App />)
    const input = component.find('input')
    input.node.value = 'Goodbye'
    input.simulate('change')
    expect(component.state('search')).to.equal('Goodbye')
  });
});
