import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkPropTypesFor } from '../test/testUtils';
import Input from './Input';

// mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));

const defaultProps = {
  success: false,
  secretWord: 'party',
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });
    test('renders without error', () => {
      const wrapper = setup();
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(false);
    });
    test('submit button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: false });
    });
    test('renders without error', () => {
      const wrapper = setup();
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });
    test('input box to show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.exists()).toBe(true);
    });
    test('submit button to show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.exists()).toBe(true);
    });
  });
});

test('does not throw warning with expected prop types', () => {
  checkPropTypesFor(Input, defaultProps);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;
  beforeEach(() => {
    // mock setup for useState hook
    mockSetCurrentGuess.mockClear();
    // before overwrite useState
    originalUseState = React.useState;
    // overwrite useState
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });
  afterEach(() => {
    // restore useState
    React.useState = originalUseState;
  });

  test('state updates with value of input box on change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    // simulate input
    const mockEvent = {
      target: {
        value: 'train',
      },
    };

    // simulate on input change, passing mock event
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('should clear input field on click submit', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    // simulate button click // passing mock event
    submitButton.simulate('click', { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});
