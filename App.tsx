import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ButtonLang from "./components/ButtonLang";
import Card, { Word } from "./components/Card";
import AddNewCardModal from "./modals/AddNewCardModal";
import ImportJsonModal from "./modals/ImportJsonModal";
import { pickRandomWordBasedOnAssertions } from "./utils/selectRandomWord";

export default function App() {
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const [showImportJsonModal, setShowImportJsonModal] =
    useState<boolean>(false);

  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    selectRandomWord();
  }, [savedWords]);

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("wordList");
      const storedWords = jsonValue != null ? JSON.parse(jsonValue) : [];
      setSavedWords(storedWords);
    } catch (e) {
      Alert.alert("Error reading data from AsyncStorage");
    }
  };

  const selectRandomWord = () => {
    if (savedWords.length === 0) {
      setSelectedWord(null);
      return;
    }
    const papa = pickRandomWordBasedOnAssertions(savedWords);
    setSelectedWord(papa);
  };

  const updateWordAssertion = async (assertedWord: Word) => {
    try {
      const wordIndex = savedWords.findIndex(
        (word) =>
          word.source === assertedWord.source &&
          word.value === assertedWord.value
      );
      if (wordIndex !== -1) {
        const updatedWords = [...savedWords];
        updatedWords[wordIndex] = {
          ...assertedWord,
          assertions: assertedWord.assertions + 1,
        };
        await AsyncStorage.setItem("wordList", JSON.stringify(updatedWords));
        setSavedWords(updatedWords);
      }
    } catch (e) {
      Alert.alert("Error updating your assertion");
    }
  };

  const toggleAddCardModal = () => {
    setShowAddCardModal((previousState) => !previousState);
  };

  const toggleImportJsonModal = () => {
    setShowImportJsonModal((previousState) => !previousState);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.header}>
        <ButtonLang
          title="New Card"
          onPress={toggleAddCardModal}
          extraStyles={styles.headerButton}
        />
        <ButtonLang
          title="Paste JSON"
          onPress={toggleImportJsonModal}
          extraStyles={styles.headerButton}
        />
      </View>
      <View style={styles.container}>
        {selectedWord && (
          <Card
            word={selectedWord}
            onTouchHandler={selectRandomWord}
            onWordAsserted={updateWordAssertion}
          />
        )}

        {!savedWords.length && (
          <Text style={styles.noCardText}>
            Looks like you don't have any cards created. You can add a new one.
          </Text>
        )}
      </View>

      <AddNewCardModal
        visible={showAddCardModal}
        onCloseHandler={toggleAddCardModal}
        onFetchHandler={fetchData}
      />
      <ImportJsonModal
        visible={showImportJsonModal}
        onCloseHandler={toggleImportJsonModal}
        onFetchHandler={fetchData}
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
    gap: 2,
    ...(Platform.OS === "android" && { marginTop: 20 }),
  },
  headerButton: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 15,
    justifyContent: "space-between",
    gap: 15,
    width: "100%",
  },
  noCardText: {
    textAlign: "center",
    fontSize: 20,
    marginTop: "100%",
    justifyContent: "center",
  },
});
