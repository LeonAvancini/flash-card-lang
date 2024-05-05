import React, { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

const TextInputLang: FC<TextInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#d3d3d3"
      textAlignVertical="top"
    />
  );
};

export default TextInputLang;
