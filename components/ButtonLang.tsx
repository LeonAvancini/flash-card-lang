import React, { FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface ButtonLangProps {
  title: string;
  onPress: () => void;
  extraStyles?: StyleProp<ViewStyle>;
}

const ButtonLang: FC<ButtonLangProps> = (props) => {
  const { title, onPress, extraStyles } = props;

  return (
    <Pressable style={[styles.button, extraStyles]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#9D9CAB",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default ButtonLang;
