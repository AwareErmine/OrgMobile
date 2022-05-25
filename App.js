import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

import FileScreen from './FileScreen.js';
import File from './File.js'

const Stack = createNativeStackNavigator();

const DarkTheme = {
  dark: true,
  colors: {
    primary: '#020529',
    background: '#020529',
    card: '#36395c',
    text: '#fff',
    border: '#36395c',
  },
};

const LightTheme = {
  dark: false,
  colors: {
    primary: '#020529',
    background: '#ebedff',
    card: '#cbdef2',
    text: '#000',
    border: '#cbdef2',
  }
}

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={FileScreen} />
        <Stack.Screen name="File" component={File} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
