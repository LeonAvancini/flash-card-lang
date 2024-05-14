import { FC, PropsWithChildren } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

const DismissKeyboardView: FC<PropsWithChildren> = ({ children }) => {
  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboardView;
