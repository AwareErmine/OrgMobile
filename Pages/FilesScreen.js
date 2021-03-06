import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, StatusBar, Platform } from 'react-native';
import { useTheme, useIsFocused } from '@react-navigation/native';
import RNFS from 'react-native-fs';

import { FileButton, NewFileModal, NewFileButton, DeleteFilesButton, ConfirmationModal } from '../components/index.js'
import { readFile } from '../Utils/index.js'

export default function FilesScreen({ navigation }) {
  const { colors } = useTheme();
  const [files, setFiles] = useState([]);
  const [newFileModalVisible, setNewFileModalVisible] = useState(false);
  const [deleteFileModalVisible, setDeleteFileModalVisible] = useState(false);
  const isFocused = useIsFocused();

  const fetchData = () => {
    console.log("Fetching!")
    RNFS.readDir(Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        const data = result
          .filter(r => r.path.slice(-3) === "txt")
            .map((r, i) => {
              return {
                id: i + r.path,
                title: r.name,
                excerpt: readFile(r.path),
                path: r.path,
                isSelected: false,
              }
            })
        let arrayCopy = [...data]; // create TRUE copy
        setFiles(arrayCopy.reverse());
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  const onLongPress = (id) => {
    files.forEach((item, i) => {
      if (item.id == id) {
        item.isSelected = !item.isSelected;
      }
    });
    let arrayCopy = [...files]; // create TRUE copy
    setFiles(arrayCopy); //?
  }

  useEffect(fetchData, [isFocused, navigation]);

  const renderItem = ({ item }) => (
    <FileButton
      title={item.title}
      excerpt={item.excerpt}
      path={item.path}
      id={item.id}
      isSelected={item.isSelected}
      onLongPress={onLongPress}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaView style={{
      ...styles.container,
      color: colors.text,
      backgroundColor: colors.background
    }}>
      <NewFileModal
        modalVisible={newFileModalVisible}
        setModalVisible={setNewFileModalVisible}
        navigation={navigation}
      />

      <ConfirmationModal
        modalVisible={deleteFileModalVisible}
        setModalVisible={setDeleteFileModalVisible}
        files={files}
        setFiles={setFiles}
      />

      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={0}
        extraData={files}
      />

      <NewFileButton
        modalVisible={newFileModalVisible}
        setModalVisible={setNewFileModalVisible}
      />

      <DeleteFilesButton
        modalVisible={deleteFileModalVisible}
        setModalVisible={setDeleteFileModalVisible}
        files={files}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
})
