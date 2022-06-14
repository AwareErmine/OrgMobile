import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import Modal from "react-native-modal";
import { useDimensions } from '../Hooks/index.js';
import { useTheme } from '@react-navigation/native';

export default function NewFileModal({ modalVisible, setModalVisible }) {
  const [input, onChangeInput] = useState('');
  const dimensions = useDimensions();
  const { colors } = useTheme();

  return (
    <View>
      <Modal
        animationType="fade"
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
            <TextInput
              style={{
                color: '#000',
              }}
              onChangeText={onChangeInput}
              value={input}
              placeholder="File name here"
              placeholderTextColor={"#bbb"}
              autoFocus={true}
            />
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
    padding: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    borderRadius: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});
