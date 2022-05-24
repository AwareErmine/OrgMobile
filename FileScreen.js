import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, StatusBar } from 'react-native';
import FileButton from './components/FileButton.js'
import { useTheme } from '@react-navigation/native';

export default function FileScreen({ navigation }) {
  const { colors } = useTheme();

  // TODO: Map each .org file to a little box which links to a screen https://reactnavigation.org/docs/params
  const DATA = [
    {
      id: 'adfsdaf',
      title: 'abc',
      excerpt: 'gfjkgg f gsdf gsdfg sdfg sdg sdf asdf sdf fdsg',
    },
    {
      id: 'adfsdaadff',
      title: 'abc',
      excerpt: 'gfjkgg f gsdf gsdfgg dfasdfg gf ',
    },
    {
      id: 'adfsdafasdfasaf',
      title: 'abc',
      excerpt: 'gfjkgg f gsdf gsdfg sdg sdfg',
    },
  ]

  const renderItem = ({ item }) => (
    <FileButton title={item.title} excerpt={item.excerpt} />
  );

  return (
    <SafeAreaView style={{
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
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
