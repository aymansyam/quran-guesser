import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WheelPickerExpo from 'react-native-wheel-picker-expo';

difficulties = [
    { label: "Easy", value: 3 },
    { label: "Medium", value: 2 },
    { label: "Hard", value: 1 }
]
function Homescreen() {
  const navigation = useNavigation();
  // react hook to store difficulty level
    const [difficulty, setDifficulty] = useState(3); // default to easy
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quran Memorization Game</Text>
      <Text style={styles.subtitle}>Select Difficulty</Text>
      <WheelPickerExpo
          height={300}
          width={200}
          initialSelectedIndex={0} // default to easy
          items={difficulties}
          onChange={({ item }) => setDifficulty(item.value)}
        />
      
      <Button
        title="Play"
        onPress={() => navigation.navigate("Game", { level: difficulty })}
        style={{
          // add space between button and text
          marginTop: 100,
        }}
      />

    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'top',
      
    },
    title: {
      fontSize: 30,
      marginTop: 100,
    },
    subtitle: {
      fontSize: 20,
      marginTop: 50,
    },
});
export default Homescreen;
