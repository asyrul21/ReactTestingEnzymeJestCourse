import react from 'react';
import { mount } from 'enzyme';

import App from './App';
import { findByTestAttr } from '../test/testUtils';

// create wrapper with specified initial conditions
// then submit a guessed word of 'train'

const setup = (state = {}) => {
  const wrapper = mount(<App />);

  // TODO: Apply state

  // add value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  // simulate click on button
  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

// describe('invalid word guess', () => {
//   test.todo('guessedWords table does not get another row');
// });

// case 1: no words were guessed
describe.skip('no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [],
    });
  });
  test('should create a guessedWords table with one row', () => {
    const guessWordRows = findByTestAttr(wrapper, 'guess-word');
    expect(guessWordRows).toHaveLength(1);
  });
});

// case 2: some words guessed
describe.skip('some words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [
        {
          guessWord: 'parka',
          letterMatchCount: 3,
        },
        {
          guessWord: 'johny',
          letterMatchCount: 1,
        },
      ],
    });
  });

  test('should create a guessWords table with three rows', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guess-word');
    expect(guessedWordRows).toHaveLength(3);
  });
});

// case 3:
describe.skip('guess secret word', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [
        {
          guessWord: 'parka',
          letterMatchCount: 3,
        },
        {
          guessWord: 'johny',
          letterMatchCount: 1,
        },
      ],
    });

    // add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', { target: { value: 'party' } });

    // simulate click on submit
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('should add rows to guess table', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guess-word');
    expect(guessedWordRows).toHaveLength(4);
  });

  test('should create a congratulations component', () => {
    const congratsComponent = findByTestAttr(wrapper, 'component-congrats');
    expect(congratsComponent).toHaveLength(1);
  });

  test('should not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.exists()).toBe(false);

    // simulate click on submit
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(false);
  });
});
