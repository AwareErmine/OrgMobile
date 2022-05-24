import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export default function FileButton({ title, excerpt }) {
  const { colors } = useTheme();
  return (
    <View style={{
      backgroundColor: colors.card,
      color: colors.text,
      borderRadius: 5,
      padding: 15,
      margin: 8,
    }}>
      <Text style={{ fontSize: 25, }}>{title}</Text>
      <Text style={{ fontSize: 15, }}>{excerpt}</Text>
    </View>
  )
}
