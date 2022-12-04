import React, { useState } from 'react';
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import WheelPickerExpo from 'react-native-wheel-picker-expo';


function Homescreen() {
  const navigation = useNavigation();
  // react hook to store difficulty level
    const [difficulty, setDifficulty] = useState(1);
  return (
    <View style={styles.container}>
      <WheelPickerExpo
          height={300}
          width={200}
          initialSelectedIndex={0}
          items={['Easy', 'Medium', 'Hard'].map((name) => ({ label: name, value: "" }))}
          onChange={({ item }) => setDifficulty(item.label)}
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
});
export default Homescreen;