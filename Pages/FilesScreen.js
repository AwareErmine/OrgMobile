import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, StatusBar, Platform } from 'react-native';
import { FileButton } from '../components/index.js'
import { useTheme } from '@react-navigation/native';
import RNFS from 'react-native-fs';

export default function FilesScreen({ navigation }) {
  const { colors } = useTheme();

  useEffect(() => {
      RNFS.readDir(Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then((result) => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[0].path), result[0].path]);
      })
      .then((statResult) => {
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'utf8');
        }

        return 'no file';
      })
      .then((contents) => {
        // log the file contents
        console.log(contents);
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }, [])

  const DATA = [
    {
      id: 'sdfdsf',
      title: 'testing',
      excerpt: 'gfjkgg f gsdf gsdfg sdfg sdg sdf asdf sdf fdsg',
      url: 'dsfsdf/sdfsdf',
    },
    {
      id: 'adfsdaadff',
      title: 'abc',
      excerpt: 'gfjkgg f gsdf gsdfgg dfasdfg gf ',
      url: 'dsfsdf/sdfsdf'
    },
    {
      id: 'adfsdafasdfasaf',
      title: 'abc',
      excerpt: 'gfjkgg f gsdf gsdfg sdg sdfg',
      url: 'dsfsdf/sdfsdf'
    },
  ]

  const renderItem = ({ item }) => (
    <FileButton title={item.title} excerpt={item.excerpt} url={item.url} navigation={navigation} />
  );

  return (
    <SafeAreaView style={{
      ...styles.container,
      color: colors.text,
      backgroundColor: colors.background
    }}>
      <FlatList
        data={DATA}
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
