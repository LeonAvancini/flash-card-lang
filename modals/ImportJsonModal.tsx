import React, { FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Modal,
  View,
  StyleSheet,
  Alert,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";
import ButtonLang from "../components/ButtonLang";
import TextInputLang from "../components/TextInputLang";
import { PLACEHOLDER } from "../utils/constants";
import DismissKeyboardView from "../components/DismissKeyboardView";

//TODO: Allow users to upload json file instead paste an array.
interface ImportJsonModalProps {
  visible: boolean;
  onCloseHandler: () => void;
  onFetchHandler: () => Promise<void>;
}

const ImportJsonModal: FC<ImportJsonModalProps> = (props) => {
  const { visible, onCloseHandler, onFetchHandler } = props;

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
            "Each item in the array must have 'source' and 'value' properties."
          );
        }
        item.assertions = 0; // Adding assertion property to each item
      }
  
      await AsyncStorage.setItem("wordList", JSON.stringify(parsedData));
      setJsonData("");
      await onFetchHandler();
      onCloseHandler();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const cleanValues = () => {
    setJsonData("");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <DismissKeyboardView>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.header}>
            <ButtonLang
              title="Back"
              onPress={() => {
                onCloseHandler();
                setJsonData("");
              }}
              extraStyles={styles.buttonStyle}
            />
            <ButtonLang
              title="Reset form"
              onPress={cleanValues}
              extraStyles={styles.buttonStyle}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>
              {`Paste JSON here without curly braces { }`}
            </Text>
            <TextInputLang
              extraStyles={styles.input}
              placeholder={PLACEHOLDER}
              multiline
              value={jsonData}
              onChangeText={(text) => setJsonData(text)}
            />
            <View style={styles.buttonContainer}>
              <ButtonLang
                title="Import"
                onPress={saveJsonToLocalStorage}
                extraStyles={styles.buttonStyle}
              />
            </View>
          </View>
        </SafeAreaView>
      </DismissKeyboardView>
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
    marginVertical: 30,
  },
  input: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 2,
    ...(Platform.OS === "android" && { marginTop: 20 }),
  },
  buttonStyle: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 15,
  },
});

export default ImportJsonModal;
