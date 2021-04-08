import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { guessWord } from './actions';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const success = useSelector((state) => state.success);

  const dispatch = useDispatch();

  if (success) {
    return <div data-test="component-input" />;
  } else {
    return (
      <div data-test="component-input">
        <form className="form-inline">
          <input
            data-test="input-box"
            className="mb-2 mx-sm-3"
            type="text"
            placeholder="enter guess"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
          ></input>
          <button
            data-test="submit-button"
            className="btn btn-primary mb-2"
            onClick={(e) => {
              e.preventDefault();
              setCurrentGuess('');
              dispatch(guessWord(currentGuess));
            }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};

export default Input;
