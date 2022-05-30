import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Dimensions, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';

import org from "org";
import { WebView } from 'react-native-webview';

import { FileText } from './components/index.js'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function File({ route, navigation }) {
  // https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
  // https://reactnative.dev/docs/textinput

  const [text, setText] = useState('Start typing!');
  const [rendered, setRendered] = useState('<h1>Start typing!</h1>');
  const [dimensions, setDimensions] = useState({ window, screen });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  useEffect(() => {
    const parser = new org.Parser();
    const orgDocument = parser.parse(text);
    const orgHTMLDocument = orgDocument.convert(org.ConverterHTML, {
      headerOffset: 1,
      exportFromLineNumber: false,
      suppressSubScriptHandling: false,
      suppressAutoLink: false
    });
    setRendered(orgHTMLDocument);
  }, [text])

  const { colors } = useTheme();

  const { url } = route.params; // for accessing the file itself later

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <View
        style={{
          color: colors.text,
          height: dimensions.window.height / 2,
        }}
      >
        <WebView
          originWhitelist={['*']}
          source={{ html: rendered }}
        />
      </View>
      <FileText
        multiline
        numberOfLines={4}
        onChangeText={text => setText(text)}
        value={text}
        style={{
          color: colors.text,
          backgroundColor: colors.card,
          underlineColorAndroid: 'transparent',

          height: dimensions.window.height / 2,
          width: dimensions.window.width,

          padding: '1.5rem',
          fontSize: '1.25rem',

          flex: 1,
          justifyContent: 'flex-end',
        }}
      />
    </SafeAreaView>
  )
}
