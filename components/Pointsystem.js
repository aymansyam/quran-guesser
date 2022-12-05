import React, { useState } from "react";
import { Text, View } from "react-native";

function Pointsystem() {
  return (
    // points system
    <View>
      <Text>Points System</Text>
      <Text>
        1. Easy has a 1/3 times multiplier, and Medium has a 1/2 multiplier
      </Text>
      <Text>2. A perfect guess is 5000 points</Text>
      <Text>3. If you guess the right Surah, you get 2500 points</Text>
      <Text>
        4. If you are within 5 ayahs, you get another 1250 points, which
        decreases by half for every 5 ayahs you are away, for a minimum of 78 points (25 ayahs)
      </Text>
      <Text>
        5. If you are within 5 surahs, you get another 39 points, which
        decreases by half for every surah you are away, for a minimum of 2 points (5 surahs)
      </Text>
    </View>
  );
}

export default Pointsystem;
