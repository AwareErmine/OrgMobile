import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function FileScreen({ navigation }) {
  console.log("hiiii");
  // TODO: Map each .org file to a little box which links to a screen https://reactnavigation.org/docs/params
  return (
    <View style={styles.container}>
      <Text>Files</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
