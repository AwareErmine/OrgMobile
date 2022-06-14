import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function NewFileButton({ modalVisible, setModalVisible }) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: colors.text,
      }}
      onPress={() => setModalVisible(true)}
    >
      <Text style={{
        ...styles.textStyle,
        color: colors.background,
      }}
      >
        New File
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
});
