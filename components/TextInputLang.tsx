import React, { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

const TextInputLang: FC<TextInputProps> = (props) => {
  return <TextInput {...props} placeholderTextColor="lightgray" />;
};

export default TextInputLang;
