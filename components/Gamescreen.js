import React, { useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import quran from "../assets/quran.json";
import { Overlay } from "react-native-elements";

// array with all surah names
const surahNames = quran.map((surah) => surah.name + " " + surah.number);
const TIMER_VALUE = 25;

function Gamescreen({ route, navigation }) {
  // react hook for overlay visibility
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    console.log("toggleOverlay: " + visible);
    if (visible) {
      console.log(surahInput, ayahInput);
      setScore(
        score +
          calculateScore(
            surahInput,
            ayahInput,
            surahNumber + 1,
            ayahNumber + 1
          )
      );
      nextRound();
    }
    setVisible(!visible);
  
  };

  // react hook for game over overlay visibility
  const [gameOverVisible, setGameOverVisible] = useState(false);
  const toggleGameOverOverlay = () => {
    setGameOverVisible(!gameOverVisible);
    if (gameOverVisible) {
      setRound(0);
      navigation.navigate("Home");
    }
  };

  const difficulty = route.params.level;
  const [justCreated, setJustCreated] = useState(true);

  // react hook to store round number
  const [round, setRound] = useState(0);

  // react hook to store the state of the ayah
  const [ayah, setAyah] = useState("");
  // react hook to store the state of the user input
  const [surahInput, setSurahInput] = useState(1);

  // react hook to store surah text
  const [surahText, setSurahText] = useState("");

  // react hook to store the state of the user input
  const [ayahInput, setAyahInput] = useState(0);

  // react hook to store the generated ayah number
  const [ayahNumber, setAyahNumber] = useState(0);

  // react hook to store the generated surah number
  const [surahNumber, setSurahNumber] = useState(0);

  // react hook to decrement the timer to 0 and then reset it
  const [timer, setTimer] = React.useState(TIMER_VALUE * difficulty);

  // react hook to store the score
  const [score, setScore] = React.useState(0);


  // react hook to detect game over
  React.useEffect(() => {
    if (round > 10) {
      toggleGameOverOverlay();
    }
  }, [round]);

  // react hook to start round 
  React.useEffect(() => {
    if (justCreated) {
      setJustCreated(false);
      nextRound();
    }
  }, [justCreated]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // react hook to reset the timer and ayah when the timer reaches 0
  React.useEffect(() => {
    if (timer <= 0) {
      setTimer(0);
      if (!visible) {
        toggleOverlay();
      }
    }
  }, [timer]);

  function generateRandomAyahAndSurah() {
    // generate random surah number between 100 and 114
    let surahNumber_tmp = 1;
    if (difficulty == 3) {
      surahNumber_tmp = Math.floor(Math.floor(Math.random() * 14) + 100);
    } else if (difficulty == 2) {
      // generate random surah number between 50 and 114
      surahNumber_tmp = Math.floor(Math.floor(Math.random() * 64) + 50);
    } else {
      // generate random surah number between 1 and 114
      surahNumber_tmp = Math.floor(Math.floor(Math.random() * 114) + 0);
    }
    const surah = quran[surahNumber_tmp];
    const ayahNumber_tmp = Math.floor(Math.random() * surah.ayahs.length);
    setSurahNumber(surahNumber_tmp);
    setAyahNumber(ayahNumber_tmp);

    console.log(surahNumber_tmp + 1, ayahNumber_tmp + 1);
    return [surahNumber_tmp, ayahNumber_tmp];
  }

  function getRandomAyah() {
    [surahNum, ayahNum] = generateRandomAyahAndSurah();
    const surah = quran[surahNum];
    // get the previous and next 3 ayahs
    let ayahs = [];
    for (let i = ayahNum - difficulty; i <= ayahNum + difficulty; i++) {
      if (i >= 0 && i < surah.ayahs.length) {
        // if the ayah is the selected ayah, then add a --> in the beginning
        if (i == ayahNum) {
          ayahs.push("-->" + surah.ayahs[i].text);
        } else {
          ayahs.push(surah.ayahs[i].text);
        }
      }
    }
    let final_text = truncateSurahText(ayahs);
    setSurahText(final_text);
  }

  function truncateSurahText(ayahs) {
    let overFlow = false;
    let result = ayahs.join(" ");
    let character_limit = 500;
    if (result.length > character_limit) {
      overFlow = true;
      // find substring "-->" and truncate the string around it
      let index = result.indexOf("-->");
      let start = index - character_limit / 2;
      let end = index + character_limit / 2;
      if (start < 0) {
        start = 0;
      }
      if (end > result.length) {
        end = result.length;
      }
      result = result.substring(start, end);
    }
    if (overFlow) {
      result = "..." + result + "...";
    }

    return result;
  }

  function nextRound() {
    setAyah(getRandomAyah());
    setTimer(TIMER_VALUE * difficulty);
    setRound(round + 1);
  }

  function calculateScore(surahGuess, ayahGuess, surahActual, ayahActual) {
    try 
    {
      let actualIndex = quran[surahActual - 1].ayahs[ayahActual - 1].number;
      let guessIndex = quran[surahGuess - 1].ayahs[ayahGuess - 1].number;
      let diff = Math.abs(actualIndex - guessIndex);
      // calculate score using the formula 100 - 10 * diff where diff is the difference between the actual and guessed ayah number 
      let calculated_score = 5000 - 5000 * ((diff * diff) / 6236);
      if (calculated_score < 0) {
        calculated_score = 0;
      }
      return Math.floor(calculated_score * (1 / difficulty));
    } catch (e) {
      return 0;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{surahText}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ flexDirection: "column" }}>
          <Picker style={styles.picker} selectedValue={surahInput} onValueChange={(itemValue, itemIndex) => 
            {
              setSurahInput(itemValue);
              setAyahInput(1);
              }}>
            {quran.map((surah, index) => (
              // picker item with value surah name and number
              <Picker.Item key={index} label={surah.name + " " + surah.number} value={surah.number} />
              // combine string with number

            ))}
          </Picker>
          <Text style={styles.surahScrollerText}>Surah</Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Picker style={styles.ayahPicker} selectedValue={ayahInput} onValueChange={(itemValue, itemIndex) => setAyahInput(itemValue)}>

            {quran[surahInput - 1].ayahs.map((ayah, index) => (
              <Picker.Item key={index} label={ayah.numberInSurah.toString()} value={ayah.numberInSurah} /> 
            ))}
              </Picker>
          <Text style={styles.ayahScrollerText}>Ayah</Text>
        </View>
      </View>
      <Overlay isVisible={gameOverVisible} onBackdropPress={toggleGameOverOverlay}>
        <Text>
          Game Over! Your score is {score} 
        </Text>
        </Overlay>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={{paddingLeft: 100 }}>
          +{calculateScore(surahInput,ayahInput,surahNumber + 1,ayahNumber + 1)} points!
        </Text>
        <Text style={ {paddingTop:10, fontSize:15} }>
          Answer was: ({quran[surahNumber].number}) Surah {quran[surahNumber].englishName} Verse {ayahNumber + 1}
        </Text>
        <Text style={ {paddingTop:10, fontSize:15} } >
          Your guess was: ({surahInput}) Surah {quran[surahInput - 1].englishName} Verse {ayahInput}
        </Text>
        <Text
          style={{ color: "blue", paddingTop: 20 }}
          onPress={() => {
            Linking.openURL(
              "https://quran.com/" +
                quran[surahNumber].number +
                "/" +
                (ayahNumber + 1)
            );
          }}
        >
          View on Quran.com
        </Text>

      </Overlay>
      <Button
        style={styles.button}
        title="Check"
        onPress={() => {
          toggleOverlay();
        }}
      />

      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.round}>Round: {round}</Text>
      <Text style={styles.timer}>{timer}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "top",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    width: 200,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  timer: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  surahScrollerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 50,
  },
  ayahScrollerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 30,
  },
  round: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: 250,
    marginTop: 20,
    marginBottom: 170,
  },
  ayahPicker: {
    height: 50,
    width: 150,
    marginTop: 20,
    marginBottom: 170,
  },

});

export default Gamescreen;
