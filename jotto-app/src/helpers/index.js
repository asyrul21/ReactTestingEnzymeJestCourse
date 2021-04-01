export function getLetterMatchCount(guessWord, secretWord) {
  const secretLetters = secretWord.split('');
  const guessLetterSet = new Set(guessWord);
  return secretLetters.filter((letter) => guessLetterSet.has(letter)).length;
}
