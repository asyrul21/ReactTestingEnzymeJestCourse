import axios from 'axios';
import { getLetterMatchCount } from '../helpers';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
};

// export action creator
export const guessWord = (guessedWord) => {
  return function (dispatch, getState) {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: {
        guessedWord,
        letterMatchCount,
      },
    });

    if (guessedWord === secretWord) {
      dispatch({
        type: actionTypes.CORRECT_GUESS,
      });
    }
  };
};

export const getSecretWord = () => {
  // thunk
  return function (dispatch, getState) {
    return axios.get('http://localhost:3030').then((res) =>
      dispatch({
        type: actionTypes.SET_SECRET_WORD,
        payload: res.data,
      })
    );
  };
};

// this is for manual acceptance test only
export const getLocalSecretWord = () => {
  return function (dispatch, getState) {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: 'party',
    });
  };
};
