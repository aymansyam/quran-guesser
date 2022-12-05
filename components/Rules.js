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
        3. The difficulty level determines from which Surahs to pull the Ayahs,
        and the amount of time you have per guess. The tier is as following:
      </Text>
      <Text></Text>
      <Text>
        Easy: 1/3 score multiplier, 75 seconds per guess, Surahs 100-114
      </Text>
      <Text>
        Medium: 1/2 score multiplier, 50 seconds per guess, Surahs 50-114
      </Text>
      <Text>Hard: normal score, 25 seconds per guess, all Surahs</Text>
      <Text></Text>
      <Text>
        The difficulty level determines the multiplier of points you earn for
        each correct guess.
      </Text>
      <Text>
        4. A perfect score is 5000 points {"("}exact guess on hard difficulty
        {")"}
      </Text>
      <Text>
        5. Points decrease the further away you are from the correct ayah
      </Text>
    </View>
  );
}

export default Rules;
