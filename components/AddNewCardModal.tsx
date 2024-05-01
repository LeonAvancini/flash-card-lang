import React, { FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
  Alert,
  Text,
} from "react-native";

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
          <Button title="Go back" onPress={onCloseHandler} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Add some values for learn :)</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Das Auto"
              value={source}
              onChangeText={(text) => setSource(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Car"
              value={value}
              onChangeText={(text) => setValue(text)}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Clean values" onPress={cleanValues} />
            <Button title="Continue" onPress={saveValuesOnLocalStorage} />
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
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    minWidth: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
});

export default AddNewCardModal;
