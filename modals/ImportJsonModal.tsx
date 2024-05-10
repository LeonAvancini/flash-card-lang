import React, { FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  StyleSheet,
  Alert,
  Text,
  SafeAreaView,
} from "react-native";
import ButtonLang from "../components/ButtonLang";
import TextInputLang from "../components/TextInputLang";

//TODO: Allow users to upload json file instead paste an array.
interface ImportJsonModalProps {
  visible: boolean;
  onCloseHandler: () => void;
}

const ImportJsonModal: FC<ImportJsonModalProps> = ({
  visible,
  onCloseHandler,
}) => {
  const [jsonData, setJsonData] = useState("");

  const saveJsonToLocalStorage = async () => {
    try {
      const parsedData = JSON.parse(jsonData);
      if (!Array.isArray(parsedData)) {
        throw new Error("Invalid JSON format. Please provide an array.");
      }
      for (const item of parsedData) {
        if (!item.source || !item.value) {
          throw new Error(
            "Each item in the array must have 'source', 'value' properties."
          );
        }
        item.assertion = 0;
      }

      await AsyncStorage.setItem("wordList", JSON.stringify(parsedData));
      setJsonData("");
      onCloseHandler();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <ButtonLang
            title="Go back"
            onPress={() => {
              onCloseHandler();
              setJsonData("");
            }}
          />
          <ButtonLang title="Import" onPress={saveJsonToLocalStorage} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Import JSON Data</Text>
          <TextInputLang
            style={styles.input}
            placeholder={`Paste JSON here without {}:
          [
            {
              "source": "Der Apfel",
              "value": "The apple"
            },
            {
              "source": "Die Katze",
              "value": "The cat"
            }
          ]
          `}
            multiline
            value={jsonData}
            onChangeText={(text) => setJsonData(text)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    width: "95%",
    height: "50%",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
});

export default ImportJsonModal;
