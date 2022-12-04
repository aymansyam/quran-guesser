import React, { useState } from 'react';
import Homescreen from './components/Homescreen.js';
import Gamescreen from './components/Gamescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Rules from './components/Rules.js';
import Pointsystem from './components/Pointsystem.js';


const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRoute="Home">
        <Stack.Screen name="Home" component={Homescreen} options={{ headerShown: false }} />
        <Stack.Screen name="Game" component={Gamescreen} />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Points" component={Pointsystem} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}