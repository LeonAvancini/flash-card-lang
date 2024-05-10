import React, { FC } from "react";
import { Keyboard, TextInput, TextInputProps } from "react-native";

const TextInputLang: FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#d3d3d3"
      textAlignVertical="top"
      onBlur={() => {
        Keyboard.dismiss();
      }}
    />
  );
};

export default TextInputLang;
