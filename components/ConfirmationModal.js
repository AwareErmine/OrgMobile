import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import Modal from "react-native-modal";
import { useDimensions } from '../Hooks/index.js';
import { useTheme } from '@react-navigation/native';

export default function ConfirmationModal({ modalVisible, setModalVisible, navigation, files, setFiles }) {
  const [input, onChangeInput] = useState('');
  const dimensions = useDimensions();
  const { colors } = useTheme();
  const selected = files.filter(f => f.isSelected);

  const onConfirm = () => {
    selected.forEach((item, i) => {
      RNFS.unlink(item.path)
        .then(() => {
          console.log('FILE DELETED');
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    const newFiles = files.filter(f => !f.isSelected);
    setFiles(newFiles);
    setModalVisible(false);
  }

  return (
    <View>
      <Modal
        transparent={true}
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        hasBackDrop={true}
        backdropColor={"#fffc"}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ color: "#000", fontWeight: "bold", padding: 10 }}>Delete selected files?</Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => onConfirm()}
            >
              <Text style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold"
              }}
              >
                DO IT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#fff",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    borderRadius: 10,
    // flexDirection: "column",
  },
  confirmButton: {
    borderRadius: 10,
    backgroundColor: "#2f9400",
    padding: 20,
  },
});
