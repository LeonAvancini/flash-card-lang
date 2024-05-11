import React, { FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";
import ButtonLang from "../components/ButtonLang";
import TextInputLang from "../components/TextInputLang";

interface AddNewCardModalProps {
  visible: boolean;
  onCloseHandler: () => void;
}

const AddNewCardModal: FC<AddNewCardModalProps> = ({
  visible,
  onCloseHandler,
}) => {
  const [source, setSource] = useState("");
  const [value, setValue] = useState("");

  const saveValuesOnLocalStorage = async () => {
    if (source && value) {
      try {
        const existingListJson = await AsyncStorage.getItem("wordList");
        let existingList = existingListJson ? JSON.parse(existingListJson) : [];

        if (!Array.isArray(existingList)) {
          existingList = [];
        }

        const newElement = { source: source, value: value, assertions: 0 };

        existingList.push(newElement);

        await AsyncStorage.setItem("wordList", JSON.stringify(existingList));
        cleanValues();
        onCloseHandler();
      } catch (e) {
        Alert.alert("Error saving");
      }
    }
  };

  const cleanValues = () => {
    setSource("");
    setValue("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <ButtonLang
            title="Back"
            onPress={onCloseHandler}
            extraStyles={styles.buttonStyle}
          />
          <ButtonLang
            title="Reset form"
            onPress={cleanValues}
            extraStyles={styles.buttonStyle}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>New Card</Text>
          <View style={styles.inputContainer}>
            <TextInputLang
              placeholder="Das Auto"
              value={source}
              onChangeText={(text) => setSource(text)}
            />
            <TextInputLang
              placeholder="Car"
              value={value}
              onChangeText={(text) => setValue(text)}
            />
            <View style={styles.buttonContainer}>
              <ButtonLang
                extraStyles={styles.buttonStyle}
                title="Create"
                onPress={saveValuesOnLocalStorage}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    margin: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 10,
    gap: 2,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 30,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonStyle: {
    flex: 1,
  },
});

export default AddNewCardModal;
