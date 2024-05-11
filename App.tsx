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
import AddNewCardModal from "./modals/AddNewCardModal";
import ImportJsonModal from "./modals/ImportJsonModal";
import ButtonLang from "./components/ButtonLang";

export default function App() {
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const [showImportJsonModal, setShowImportJsonModal] =
    useState<boolean>(false);
  const [isAssertionButtonDisabled, setIsAssertionButtonDisabled] =
    useState<boolean>(false);
  const [savedWords, setSavedWords] = useState<Word[]>([]);
  const [word, setWord] = useState<Word>();

  const selectRandomWord = () => {
    //TODO: Random value should consider weight of values based on assertion value, implement logic after user is able to press a button when they assert
    const randomIndex = Math.floor(Math.random() * savedWords.length);
    setWord(savedWords[randomIndex]);
  };

  const fetchData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("wordList");
      const storedWords = jsonValue != null ? JSON.parse(jsonValue) : [];
      setSavedWords(storedWords);
    } catch (e) {
      Alert.alert("Error reading data from AsyncStorage");
    }
  };

  useEffect(() => {
    fetchData();
  }, [showAddCardModal, showImportJsonModal]);

  useEffect(() => {
    if (!word) {
      selectRandomWord();
    }
  }, [savedWords]);

  const onAssertion = () => {
    console.log("On assertion do something");
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
        <Card
          word={word}
          onTouchHandler={selectRandomWord}
          isShowingTranslation={setIsAssertionButtonDisabled}
        />

        {!!savedWords.length && (
          <View>
            <ButtonLang
              title="I got it right! 🤓"
              onPress={onAssertion}
              extraStyles={styles.assertionButton}
              disabled={isAssertionButtonDisabled}
            />
          </View>
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
      />
      <ImportJsonModal
        visible={showImportJsonModal}
        onCloseHandler={toggleImportJsonModal}
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
  assertionButton: {
    backgroundColor: "green",
    height: 100,
  },
});
