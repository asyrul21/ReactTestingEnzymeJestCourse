import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkPropTypesFor } from '../test/testUtils';
import Input from './Input';

const defaultProps = {};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

test('does not throw warning with expected prop types', () => {
  checkPropTypesFor(Input, defaultProps);
});

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-input');
  expect(component.length).toBe(1);
});
