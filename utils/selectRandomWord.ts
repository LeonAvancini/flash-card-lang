import { Word } from "../components/Card";

export const pickRandomWordBasedOnAssertions = (wordList: Word[]) => {
  const totalWeight = wordList.reduce(
    (sum, word) => sum + (word.assertions === 0 ? 1 : 1 / word.assertions),
    0
  );

  if (totalWeight === 0) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
    return;
  }

  const randomNum = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const word of wordList) {
    cumulativeWeight += word.assertions === 0 ? 1 : 1 / word.assertions;
    if (randomNum < cumulativeWeight) {
      return word;
    }
  }
};
