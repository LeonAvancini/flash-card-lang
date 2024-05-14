import React, { FC, useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import ButtonLang from "./ButtonLang";

export interface Word {
  source: string;
  value: string;
  assertions: number;
}

interface CardProps {
  word: Word;
  onTouchHandler: () => void;
  onWordAsserted: (word: Word) => void;
}

const Card: FC<CardProps> = (props) => {
  const { word, onTouchHandler, onWordAsserted } = props;
  const [showTranslation, setShowTranslation] = useState(false);
  const [displayedWord, setDisplayedWord] = useState(word);

  const toggleTranslation = () => {
    if (!showTranslation) {
      setShowTranslation(true);
      onTouchHandler();
      return;
    }

    const shouldSwap = Math.random() < 0.5;
    if (shouldSwap) {
      setDisplayedWord({
        ...word,
        source: word.value,
        value: word.source,
      });
    } else {
      setDisplayedWord(word);
    }
    setShowTranslation(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={toggleTranslation}>
        <Text style={styles.source}>{displayedWord?.source}</Text>
        {showTranslation && (
          <Text style={styles.translation}>{displayedWord?.value}</Text>
        )}
      </TouchableOpacity>
      <View>
        <ButtonLang
          title="I got it right! 🤓"
          onPress={() => {
            onWordAsserted(displayedWord);
            toggleTranslation();
          }}
          extraStyles={styles.assertionButton}
          disabled={!showTranslation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
  },
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
  assertionButton: {
    backgroundColor: "green",
    height: 100,
  },
});

export default Card;
