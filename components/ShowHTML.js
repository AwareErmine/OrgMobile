import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import { StyleSheet, SafeAreaView } from 'react-native';

export default function ShowHTML({ html, dimensions }) {
  const { colors } = useTheme();
  console.log(html);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        color: colors.text,
        height: dimensions.window.height / 2,
        width: dimensions.window.width
      }}
    >
      <WebView
        injectedJavaScript={`
          document.body.style.backgroundColor = 'hotpink';

          window.onerror = function(message, sourcefile, lineno, colno, error) {
            console.log("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
            return true;
          };
          alert("I am here");
          true;
        `}
        originWhitelist={['*']}
        source={{
          html: html,
        }}
      />
    </SafeAreaView> 
  )
}
