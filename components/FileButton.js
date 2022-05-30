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
        padding: '1.25rem',
        margin: '1rem',
        flex: 1,
      }}
      onPress={() =>
        navigation.navigate('File', { url: url })
      }
    >
      <Text style={{ fontSize: '2rem', color: colors.text, }}>{title}</Text>
      <Text style={{ fontSize: '1.2rem', color: colors.text, }}>{excerpt}</Text>
    </TouchableOpacity>
  )
}
