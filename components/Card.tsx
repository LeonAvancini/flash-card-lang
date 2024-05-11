import React, { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export interface Word {
  source: string;
  value: string;
  assertions: number;
}

interface CardProps {
  word?: Word;
  onTouchHandler: () => void;
  isShowingTranslation: (value: boolean) => void;
}

const Card: FC<CardProps> = (props) => {
  const { word, onTouchHandler, isShowingTranslation } = props;
  const [showTranslation, setShowTranslation] = useState(false);
  const [displayedWord, setDisplayedWord] = useState(word);

  useEffect(() => {
    isShowingTranslation(!showTranslation);
  }, [showTranslation]);

  if (!word) return null;

  const toggleTranslation = () => {
    if (!showTranslation) {
      onTouchHandler();
      setShowTranslation((prevState) => !prevState);
      return;
    }

    const shouldSwap = Math.random() < 0.5;
    if (shouldSwap) {
      setDisplayedWord({
        source: word.value,
        value: word.source,
        assertions: word.assertions,
      });
    } else {
      setDisplayedWord(word);
    }
    setShowTranslation((prevState) => !prevState);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={toggleTranslation}>
      <Text style={styles.source}>{displayedWord?.source}</Text>
      {showTranslation && (
        <Text style={styles.translation}>{displayedWord?.value}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  source: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  translation: {
    fontSize: 20,
    marginTop: 10,
    color: "gray",
    textAlign: "center",
  },
});

export default Card;
