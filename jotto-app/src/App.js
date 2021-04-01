import './App.css';
import Congrats from './Congrats';
import GuessWords from './GuessWords';

function App() {
  return (
    <div className="container">
      <h1>Jotto</h1>
      <Congrats success={true} />
      <GuessWords
        guessedWords={[
          {
            guessWord: 'train',
            letterMatchCount: 3,
          },
        ]}
      />
    </div>
  );
}

export default App;
