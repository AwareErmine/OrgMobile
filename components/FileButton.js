import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FileButton({ navigation, title, excerpt, path }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 5,
        padding: 20,
        margin: 5,
        flex: 1,
      }}
      onPress={() =>
        navigation.navigate('File', { path: path })
      }
    >
      <Text style={{ fontSize: 25, color: colors.text, }}>{title}</Text>
      <Text style={{ fontSize: 20, color: colors.text, }}>{excerpt}</Text>
    </TouchableOpacity>
  )
}
