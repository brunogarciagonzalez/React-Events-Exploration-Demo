import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import SimplerComponent from '../src/components/SimplerComponent';

Enzyme.configure({ adapter: new Adapter() })

const Noop = (props) => { return <p>Noop</p> };

describe('<SimplerComponent />', () => {
  let wrapper, spy;

  beforeEach(() => {
    spy = sinon.spy();
    wrapper = !SimplerComponent.prototype ?
      shallow(<Noop />) : shallow(<SimplerComponent handleClick={spy} />);
  });

  it('should be a stateless functional component', () => {
    const tryToGetState = () => { wrapper.state(); }
    expect(tryToGetState).to.throw(
      'ShallowWrapper::state() can only be called on class components',
      'Component should not have state.'
    );
  });

  it('should render a div with text "I am just happy"', () => {
    expect(wrapper.find('div').text()).to.match(/I am just happy/);
  });

  it('should be capable of handling onClick', () => {
    wrapper.find('div').simulate('click');
    expect(spy.called).to.be.true;
  });

});
