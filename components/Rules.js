import React, { useState } from "react";
import { Text, View } from "react-native";

function Rules() {
  return (
    // list of game rules
    <View>
      <Text>Rules</Text>
      <Text>
        1. Using the two scroll wheels, guess the correct Surah and Ayah. The
        Ayah highlighted by --{">"} is what you are guessing.
      </Text>
      <Text>2. You have 10 rounds to earn as many points as possible.</Text>
      <Text>
        3. The difficulty level determines the multiplier of points you earn for
        each correct guess.
      </Text>
    </View>
  );
}

export default Rules;
