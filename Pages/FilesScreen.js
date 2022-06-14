import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, StatusBar, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNFS from 'react-native-fs';

import { FileButton, NewFileModal, NewFileButton } from '../components/index.js'
import { readFile } from '../Utils/index.js'

export default function FilesScreen({ navigation }) {
  const { colors } = useTheme();
  const [files, setFiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
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
              }
            })
        setFiles(data);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }, [])

  const renderItem = ({ item }) => (
    <FileButton title={item.title} excerpt={item.excerpt} path={item.path} navigation={navigation} />
  );

  return (
    <SafeAreaView style={{
      ...styles.container,
      color: colors.text,
      backgroundColor: colors.background
    }}>
      <NewFileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={0}
      />

      <NewFileButton
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
