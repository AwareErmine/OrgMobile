import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FileButton({ navigation, title, excerpt, path }) {
  const { colors } = useTheme();
  const [xrpt, setXrpt] = useState();

  useEffect(() => {
    excerpt.then((result) => {
      setXrpt(result.slice(0, 50).replace('\n', ' '));
    })
  }, [])

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
      <Text style={{ fontSize: 25, color: colors.text, }}>{title.substring(0, title.length-4).replace('-', ' ')}</Text>
      <Text style={{ fontSize: 20, color: colors.text, }}>{xrpt}</Text>
    </TouchableOpacity>
  )
}
