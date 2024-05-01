import React, { FC, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export interface Word {
  source: string;
  value: string;
  assertions: number;
}

interface CardProps {
  word: Word;
  onTouchHandler: () => void;
}
const Card: FC<CardProps> = (props) => {
  const { word, onTouchHandler } = props;
  const [showTranslation, setShowTranslation] = useState(false);

  const toggleTranslation = () => {
    if (showTranslation) {
      onTouchHandler();
      setShowTranslation(!showTranslation);
      return;
    }
    setShowTranslation(!showTranslation);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={toggleTranslation}>
      <Text style={styles.source}>{word.source}</Text>
      {showTranslation && <Text style={styles.translation}>{word.value}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  source: {
    fontSize: 20,
    fontWeight: "bold",
  },
  translation: {
    fontSize: 16,
    marginTop: 10,
    color: "gray",
  },
});

export default Card;
