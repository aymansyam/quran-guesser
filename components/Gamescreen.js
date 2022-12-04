import React, { useState } from "react";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import quran from "../assets/quran.json";

// array with all surah names
const surahNames = quran.map((surah) => surah.name + " " + surah.number);
const TIMER_VALUE = 60;

function Gamescreen({ route, navigation }) {
  const difficulty = route.params.level;
  // react hook to store the state of the ayah
  const [ayah, setAyah] = useState("");
  // react hook to store the state of the user input
  const [surahInput, setSurahInput] = useState("NA 1");

  // react hook to store surah text
  const [surahText, setSurahText] = useState("");

  // react hook to store the state of the user input
  const [ayahInput, setAyahInput] = useState(0);

  // react hook to store the generated ayah number
  const [ayahNumber, setAyahNumber] = useState(0);

  // react hook to store the generated surah number
  const [surahNumber, setSurahNumber] = useState(0);

  // react hook to decrement the timer to 0 and then reset it
  const [timer, setTimer] = React.useState(0);

  // react hook to store the score
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // react hook to reset the timer and ayah when the timer reaches 0
  React.useEffect(() => {
    if (timer <= 0) {
      setAyah(getRandomAyah());
      setTimer(TIMER_VALUE / difficulty);
    }
  }, [timer]);

  function generateRandomAyahAndSurah() {
    // generate random surah number between 100 and 114
    let surahNumber_tmp = 0;
    if (difficulty === 1) {
      surahNumber_tmp = Math.floor(Math.floor(Math.random() * 14) + 100);
    } else if (difficulty === 2) {
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
    const ayah = surah.ayahs[ayahNum];
    setSurahText(() => {
      if (difficulty === 1) {
        // get the previous and next 3 ayahs
        let ayahs = [];
        for (let i = ayahNum - 3; i <= ayahNum + 3; i++) {
          if (i >= 0 && i < surah.ayahs.length) {
            // if the ayah is the selected ayah, then add a paranthesis around it
            if (i === ayahNum) {
              ayahs.push("(" + surah.ayahs[i].text + ")");
            } else {
              ayahs.push(surah.ayahs[i].text);
            }
          }
        }
        return ayahs.join(" ");
      } else if (difficulty === 2) {
        // get the previous and next 2 ayahs
        let ayahs = [];
        for (let i = ayahNum - 2; i <= ayahNum + 2; i++) {
          if (i >= 0 && i < surah.ayahs.length) {
            // if the ayah is the selected ayah, then add a paranthesis around it
            if (i === ayahNum) {
              ayahs.push("(" + surah.ayahs[i].text + ")");
            } else {
              ayahs.push(surah.ayahs[i].text);
            }
          }
        }
        return ayahs.join(" ");
      } else {
        // get the previous and next ayah
        let ayahs = [];
        for (let i = ayahNum - 1; i <= ayahNum + 1; i++) {
          if (i >= 0 && i < surah.ayahs.length) {
            // if the ayah is the selected ayah, then add a paranthesis around it
            if (i === ayahNum) {
              ayahs.push("(" + surah.ayahs[i].text + ")");
            } else {
              ayahs.push(surah.ayahs[i].text);
            }
          }
        }
        return ayahs.join(" ");
      }
    });
  }

  // function to get the ayahs when the user selects a surah
  function getAyahs() {
    // get the surah number from the user input regex match
    const surahNumber = surahInput.match(/\d+/)[0];
    const surah = quran[surahNumber - 1];
    return surah.ayahs;
  }

  function nextRound() {
    setAyah(getRandomAyah());
    setTimer(TIMER_VALUE / difficulty);
  }

  function calculateScore(surahGuess, ayahGuess, surahActual, ayahActual) {
    calculated_score = 0;
    // perfect score
    if (surahGuess == surahActual && ayahGuess == ayahActual) {
      calculated_score += 5000;
    } else {
      // surah is correct
      if (surahGuess == surahActual) {
        calculated_score += 2500;
        // check if the ayah is within 5 ayahs of the actual ayah
        if (ayahGuess >= ayahActual - 5 && ayahGuess <= ayahActual + 5) {
          calculated_score += 1250;
        }
        // check if the ayah is within 10 ayahs of the actual ayah
        else if (ayahGuess >= ayahActual - 10 && ayahGuess <= ayahActual + 10) {
          calculated_score += 625;
        }
        // check if the ayah is within 15 ayahs of the actual ayah
        else if (ayahGuess >= ayahActual - 15 && ayahGuess <= ayahActual + 15) {
          calculated_score += 312;
        }
        // check if the ayah is within 20 ayahs of the actual ayah
        else if (ayahGuess >= ayahActual - 20 && ayahGuess <= ayahActual + 20) {
          calculated_score += 156;
        }
        // check if the ayah is within 25 ayahs of the actual ayah
        else if (ayahGuess >= ayahActual - 25 && ayahGuess <= ayahActual + 25) {
          calculated_score += 78;
        }
      }
      // surah is incorrect
      else {
        // check if the surah is within 1 surahs of the actual surah
        if (surahGuess >= surahActual - 1 && surahGuess <= surahActual + 1) {
          calculated_score += 39;
        }
        // check if the surah is within 2 surahs of the actual surah
        else if (
          surahGuess >= surahActual - 2 &&
          surahGuess <= surahActual + 2
        ) {
          calculated_score += 19;
        }
        // check if the surah is within 3 surahs of the actual surah
        else if (
          surahGuess >= surahActual - 3 &&
          surahGuess <= surahActual + 3
        ) {
          calculated_score += 9;
        }
        // check if the surah is within 4 surahs of the actual surah
        else if (
          surahGuess >= surahActual - 4 &&
          surahGuess <= surahActual + 4
        ) {
          calculated_score += 4;
        }
        // check if the surah is within 5 surahs of the actual surah
        else if (
          surahGuess >= surahActual - 5 &&
          surahGuess <= surahActual + 5
        ) {
          calculated_score += 2;
        }
      }
    }
    return calculated_score;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{surahText}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <WheelPickerExpo
          height={300}
          width={200}
          initialSelectedIndex={100}
          items={surahNames.map((name) => ({ label: name, value: "" }))}
          onChange={({ item }) => setSurahInput(item.label)}
        />

        <WheelPickerExpo
          height={300}
          width={100}
          initialSelectedIndex={0}
          items={getAyahs(surahInput)
            .map((ayah) => ayah.numberInSurah)
            .map((name) => ({ label: name, value: "" }))}
          onChange={({ item }) => setAyahInput(item.label)}
        />
      </View>
      <Button
        style={styles.button}
        title="Check"
        onPress={() => {
          const surahCheckNum = surahInput.match(/\d+/)[0];
          console.log(surahCheckNum, ayahInput);
          setScore(
            score +
              calculateScore(
                surahCheckNum,
                ayahInput,
                surahNumber + 1,
                ayahNumber + 1
              )
          );
          nextRound();
        }}
      />

      <Text style={styles.score}>Score: {score}</Text>
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
});

export default Gamescreen;
