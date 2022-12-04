import React, { useState } from 'react';
import Homescreen from './components/Homescreen.js';
import Gamescreen from './components/Gamescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute="Home">
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Game" component={Gamescreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}