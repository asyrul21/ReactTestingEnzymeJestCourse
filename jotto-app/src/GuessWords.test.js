import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr, checkPropTypesFor } from '../test/testUtils';
import GuessWords from './GuessWords';

const defaultProps = {
  guessedWords: [{ guessWord: 'train', letterMatchCount: 3 }],
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<GuessWords {...setupProps} />);
};

test('does not throw warning with expected prop types', () => {
  checkPropTypesFor(GuessWords, defaultProps);
});

// describe to group tasks
describe('if there are no words guessed', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({
      guessedWords: [],
    });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessedWords');
    expect(component.length).toBe(1);
  });
  test('renders instructions to guess a word', () => {
    const instructions = findByTestAttr(wrapper, 'guess-instructions');
    expect(instructions.text().length).not.toBe(0);
  });
});

describe('if there are words guessed', () => {
  const guessedWords = [
    {
      guessWord: 'train',
      letterMatchCount: 3,
    },
    {
      guessWord: 'agile',
      letterMatchCount: 1,
    },
    {
      guessWord: 'party',
      letterMatchCount: 5,
    },
  ];

  let wrapper;
  beforeEach(() => {
    wrapper = setup({ guessedWords });
  });

  test('renders without error', () => {
    const component = findByTestAttr(wrapper, 'component-guessedWords');
    expect(component.length).toBe(1);
  });

  test('renders Guessed Words section', () => {
    const guessWordsNode = findByTestAttr(wrapper, 'guessed-words-section');
    expect(guessWordsNode.length).toBe(1);
  });

  test('correct number of guessed words', () => {
    const guessWordsNodes = findByTestAttr(wrapper, 'guessed-word');
    expect(guessWordsNodes.length).toBe(guessedWords.length);
  });
});
