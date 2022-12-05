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
      <Text>
        3. Points decrease the further away you are from the correct ayah by the
        following function (x is the difference between the correct ayah and
        your guess): 
      </Text>
        <Text>Points = 5000 - 5000 * (x^2 / 6236)</Text>
    </View>
  );
}

export default Pointsystem;
