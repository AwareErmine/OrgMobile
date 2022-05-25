import * as React from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, StatusBar } from 'react-native';
import FileButton from './components/FileButton.js'
import { useTheme } from '@react-navigation/native';

export default function FileScreen({ navigation }) {
  const { colors } = useTheme();

  const DATA = [
    {
      id: 'adfsdaf',
      title: 'abc',
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
