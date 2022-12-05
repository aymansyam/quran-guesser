import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { Picker } from "@react-native-picker/picker";

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
      <View style={styles.titleContainer}>
      <Button
        title="Rules"
        onPress={() => navigation.navigate("Rules")}
      />
      <Button

        title="Points System"
        onPress={() => navigation.navigate("Points")}
      />
        </View>

      <Text style={styles.title}>Quran Memorization Game</Text>
      <Text style={styles.subtitle}>Select Difficulty</Text>
      <Picker style={styles.picker}
        selectedValue={difficulty}
        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
      >
        {difficulties.map((item, index) => {
          return (<Picker.Item label={item.label} value={item.value} key={index} />);
        })}
      </Picker>
      
      <Button
        title="Start Game"
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
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: 20,
      paddingTop: 50,
    },
    picker: {
      width: 200,
      height: 50,
      marginBottom: 150,
    }

});
export default Homescreen;
