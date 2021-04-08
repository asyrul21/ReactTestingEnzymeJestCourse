import react from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { findByTestAttr, storeFactory } from '../test/testUtils';

// activate global mock to make sure getSecretWord does not make network call
jest.mock('./actions');

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

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
describe('no words guessed', () => {
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
describe('some words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [
        {
          guessedWord: 'parka',
          letterMatchCount: 3,
        },
        {
          guessedWord: 'johny',
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
describe('guess secret word', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [
        {
          guessedWord: 'parka',
          letterMatchCount: 3,
        },
        {
          guessedWord: 'johny',
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
