import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SimpleComponent from '../src/components/SimpleComponent';

Enzyme.configure({ adapter: new Adapter() })

const Noop = (props) => { return <p>Noop</p> };

describe('<SimpleComponent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = !SimpleComponent.prototype ?
      shallow(<Noop />) : shallow(<SimpleComponent />);
  });

  it('has state', () => {
    expect(wrapper.state(), 'Component should have state.').to.exist;
  });

  it('has state property `mood`', () => {
    expect(wrapper.state()).to.have.key('mood');
  });

  it('default `mood` state should be "happy"', () => {
    expect(wrapper.state().mood).to.equal(
      'happy', 'Default mood is incorrect.'
    );
  });

  it('default "happy" state should be accurately rendered', () => {
    expect(wrapper.find('div').text()).to.equal(
      'happy',
      'Default mood was incorrectly rendered.'
    );
  });

  it('when clicked the div should toggle the state to "sad"', () => {
    wrapper.find('div').simulate('click');
    expect(wrapper.state().mood).to.equal(
      'sad',
      'Mood state not "sad" after click.'
    );
  });

  it('after click, "sad" state should be accurately rendered', () => {
    wrapper.find('div').simulate('click');
    expect(wrapper.find('div').text()).to.equal(
      'sad',
      'Mood state incorrectly rendered after click.'
    );
  });

});
