import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function DeleteFilesButton({ modalVisible, setModalVisible, files }) {
  const { colors } = useTheme();

  const selected = files.filter(f => f.isSelected);

  return (
    selected.length
      ? <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: "#b82916",
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{
          ...styles.textStyle,
          color: "#fff",
        }}
        >
          Delete selected
        </Text>
      </TouchableOpacity>
    : <></>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 18,
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
