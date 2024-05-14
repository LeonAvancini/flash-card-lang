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
  disabled?: boolean;
}

const ButtonLang: FC<ButtonLangProps> = (props) => {
  const { title, onPress, extraStyles, disabled } = props;

  return (
    <Pressable
      style={[styles.button, extraStyles, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#eb6b34",
    height: 50,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#FFFFFF",
  },
  buttonDisabled: {
    backgroundColor: "#D3D3D3",
  },
});

export default ButtonLang;
