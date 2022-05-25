import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FileButton({ navigation, title, excerpt, url }) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.card,
        borderRadius: 5,
        padding: 15,
        margin: 10,
        flex: 1,
      }}
      onPress={() =>
        navigation.navigate('File', { url: url })
      }
    >
      <Text style={{ fontSize: 25, color: colors.text, }}>{title}</Text>
      <Text style={{ fontSize: 15, color: colors.text, }}>{excerpt}</Text>
    </TouchableOpacity>
  )
}
