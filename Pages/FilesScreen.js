import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, StatusBar, Platform } from 'react-native';
import { FileButton } from '../components/index.js'
import { useTheme } from '@react-navigation/native';
import RNFS from 'react-native-fs';

export default function FilesScreen({ navigation }) {
  const { colors } = useTheme();
  const [files, setFiles] = useState();

  useEffect(() => {
    RNFS.readDir(Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        const data = result
          .filter(r => r.path.slice(-3) === "txt")
            .map((r, i) => {
              return {
                id: i + r.path,
                title: r.name,
                excerpt: "testing",
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
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
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
