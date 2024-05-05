import {
  Alert,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Platform,
} from "react-native";
import Card, { Word } from "./components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import AddNewCardModal from "./components/AddNewCardModal";
import ImportJsonModal from "./components/ImportJsonModal";
import ButtonLang from "./components/ButtonLang";

export default function App() {
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const [showImportJsonModal, setShowImportJsonModal] =
    useState<boolean>(false);
  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [word, setWord] = useState<Word>();

  const selectRandomWord = () => {
    //TODO: Random value should consider weight of values based on assertion value, implement logic after user is able to press a button when they assert

    const randomIndex = Math.floor(Math.random() * savedWords.length);
    setWord(savedWords[randomIndex]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("wordList");
        const storedWords = jsonValue != null ? JSON.parse(jsonValue) : [];
        setSavedWords(storedWords);
      } catch (e) {
        Alert.alert("Error reading data from AsyncStorage");
      }
    };

    fetchData();
  }, [showAddCardModal, showImportJsonModal]);

  useEffect(() => {
    if (!savedWords.length) {
      setWord(undefined);
    }
    if (!word) {
      selectRandomWord();
    }
  }, [savedWords]);

  const toggleAddCardModalVisibility = () => {
    setShowAddCardModal((previousState) => !previousState);
  };

  const toggleImportJsonModalVisibility = () => {
    setShowImportJsonModal((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <ButtonLang
          title="Add new card"
          onPress={toggleAddCardModalVisibility}
        />
        <ButtonLang
          title="Import Json"
          onPress={toggleImportJsonModalVisibility}
        />
      </View>
      <View style={styles.container}>
        {word && <Card word={word} onTouchHandler={selectRandomWord} />}
        {!savedWords.length && (
          <Text style={styles.noCardText}>
            Looks like you don't have any cards created. You can add a new one.
          </Text>
        )}
      </View>
      <AddNewCardModal
        visible={showAddCardModal}
        onCloseHandler={toggleAddCardModalVisibility}
      />
      <ImportJsonModal
        visible={showImportJsonModal}
        onCloseHandler={toggleImportJsonModalVisibility}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    ...(Platform.OS === "android" && { marginTop: 20 }),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  noCardText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
  },
});
