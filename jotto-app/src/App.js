import './App.css';
import Congrats from './Congrats';
import GuessWords from './GuessWords';
import Input from './Input';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSecretWord, getLocalSecretWord } from './actions';

function App() {
  // get props from shared state
  const success = useSelector((state) => state.success);
  const guessedWords = useSelector((state) => state.guessedWords);
  const secretWord = useSelector((state) => state.secretWord);

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getSecretWord());
    dispatch(getLocalSecretWord());
  }, []);

  return (
    <div className="container" data-test="component-app">
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
