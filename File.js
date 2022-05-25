import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default function File({ route, navigation }) {
  // https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
  // https://reactnative.dev/docs/textinput

  const { url } = route.params;
  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{ color: 'white' }}>Hiii</Text>
      <Text style={{ color: 'white' }}>{url}</Text>
    </SafeAreaView>
  )
}
