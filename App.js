import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import quran from './assets/quran.json';


export default function App() {

  getRandomAyah = () => {
    const surah = quran[Math.floor(Math.random() * quran.length)];
    const ayah = surah.ayahs[Math.floor(Math.random() * surah.ayahs.length)];
    console.log(ayah['text']);
    return ayah['text'];

  }

  return (
    // center view on top of screen
    
    <View style={styles.container}>
      <Text style={styles.text}>{getRandomAyah()}</Text>
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
  }
});

// q: set remote url git
// a: git remote add origin