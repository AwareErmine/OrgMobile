import React, { useState, useEffect } from "react";
import RNFS from 'react-native-fs';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import Modal from "react-native-modal";
import { useDimensions } from '../Hooks/index.js';
import { useTheme } from '@react-navigation/native';

export default function NewFileModal({ modalVisible, setModalVisible, navigation }) {
  const [input, onChangeInput] = useState('');
  const dimensions = useDimensions();
  const { colors } = useTheme();

  const onSubmitEdit = () => {
    const path = (Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath) + "/" + input.replace(/[\W_]+/g, "-") + '.txt';
    navigation.navigate('File', { path: path });
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
            <TextInput
              style={{
                color: '#000',
                fontSize: 18,
                padding: 20
              }}
              onChangeText={onChangeInput}
              value={input}
              placeholder="File name here"
              placeholderTextColor={"#bbb"}
              autoFocus={true}
              onSubmitEdit={onSubmitEdit}
              autoCorrect={false}
            />
            <TouchableOpacity
              onPress={onSubmitEdit}
              style={{
                borderRadius: 10,
                backgroundColor: "#000",
                padding: 15,
              }}
            >
              <Text style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold"
              }}
              >
                SUBMIT
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
    padding: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    borderRadius: 10,
  },
});
