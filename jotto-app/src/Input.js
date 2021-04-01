import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ success, secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');

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
              // TODO: update guessWords
              // TODO: check against secret word
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
