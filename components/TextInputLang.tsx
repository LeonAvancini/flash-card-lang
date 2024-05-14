import React, { FC } from "react";
import {
  Keyboard,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";

interface TextInputLangProps extends TextInputProps {
  extraStyles?: StyleProp<TextStyle>;
}

const TextInputLang: FC<TextInputLangProps> = (props) => {
  const { extraStyles } = props;

  return (
    <TextInput
      {...props}
      style={[styles.baseInputStyle, extraStyles]}
      placeholderTextColor="#d3d3d3"
      textAlignVertical="top"
      onBlur={() => {
        Keyboard.dismiss();
      }}
    />
  );
};

const styles = StyleSheet.create({
  baseInputStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 10,
    minWidth: "100%",
    height: 50
  },
});

export default TextInputLang;
