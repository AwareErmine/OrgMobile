import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function FileButton({ navigation, title, excerpt, path }) {
  const { colors } = useTheme();
  const [xrpt, setXrpt] = useState();

  useEffect(() => {
    excerpt.then((result) => {
      setXrpt(result.slice(0, 40).replace(/(\r\n|\n|\r)/gm, "  ") + "...");
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
      <Text style={{ fontSize: 22, color: colors.text, fontWeight: 'bold' }}>{title.substring(0, title.length-4).replace(/-/g, " ")}</Text>
      <Text style={{ fontSize: 18, color: colors.text, }}>{xrpt}</Text>
    </TouchableOpacity>
  )
}
