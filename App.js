import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import quran from './assets/quran.json';


export default function App() {


  // react hook to store the state of the ayah
  const [ayah, setAyah] = useState('');
  // react hook to store the state of the user input
  const [surahInput, setSurahInput] = useState('');

  // react hook to store the state of the user input
  const [ayahInput, setAyahInput] = useState('');

  // react hook to store the generated ayah number 
  const [ayahNumber, setAyahNumber] = useState(0);

  // react hook to store the generated surah number
  const [surahNumber, setSurahNumber] = useState(0);

  // react hook to decrement the timer to 0 and then reset it
  const [timer, setTimer] = React.useState(0);

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
      setTimer(30);
    }
  }, [timer]);

  function generateRandomAyahAndSurah() {
    const surahNumber_tmp = Math.floor(Math.random() * quran.length);
    const surah = quran[surahNumber_tmp];
    const ayahNumber_tmp = Math.floor(Math.random() * surah.ayahs.length);
    setSurahNumber(surahNumber_tmp);
    setAyahNumber(ayahNumber_tmp);
    
    console.log(surahNumber_tmp, ayahNumber_tmp);
    return [surahNumber_tmp, ayahNumber_tmp];
  }

  function getRandomAyah () {
    [surahNum, ayahNum] = generateRandomAyahAndSurah();
    const surah = quran[surahNum];
    const ayah = surah.ayahs[ayahNum];
    return ayah['text'];
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{ayah}</Text>

      <TextInput 
        style={styles.input}
        onChangeText={text => setSurahInput(text)}
        value={surahInput}
        placeholder="Surah Number" 
        />
      <TextInput         
        style={styles.input}
        onChangeText={text => setAyahInput(text)}
        value={ayahInput}
        placeholder="Ayah Number" />
      <Button style = {styles.button} title="Check" onPress={() => {
        if ((surahInput - 1) == surahNumber && (ayahInput - 1) == ayahNumber) {
          alert("Correct!");
        } else {
          alert("Incorrect!");
        }
      }} />
      <Text style={styles.score}>Score: 0</Text>
      <Text style={styles.timer}>{timer}</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    marginTop: 100,
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold', 
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
    fontWeight: 'bold',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  }

});