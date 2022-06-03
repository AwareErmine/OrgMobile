import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Text, Dimensions, Platform, Animated, PanResponder, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import org from "org";

import { FileText, ShowHTML } from './components/index.js'

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function File({ route, navigation }) {
  // https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md
  // https://reactnative.dev/docs/textinput

  const [text, setText] = useState('Start typing!');
  const [rendered, setRendered] = useState('Start typing!');
  const [dimensions, setDimensions] = useState({ window, screen });
  const [topHeight, setTopHeight] = useState(dimensions.window.height / 2);
  const [isDividerClicked, setIsDividerClicked] = useState(false);
  // const [offSet, setOffSet] = useState(dimensions.window.height / 2);
  const pan = useRef(new Animated.ValueXY()).current;

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
    setRendered(orgHTMLDocument.toString());
  }, [text])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
        setIsDividerClicked(true);
      },
      onPanResponderMove: (e, gestureState) => {
        setTopHeight(topHeight + gestureState.dy);

        console.log(gestureState.dy);

        Animated.event(
          [
            null,
            { dy: pan.y }
          ],
          {useNativeDriver: false}
        )(e, gestureState);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        setIsDividerClicked(false);
      }
    })
  ).current;

  const { colors } = useTheme();

  const { url } = route.params; // for accessing the file itself later

  return (
    <KeyboardAvoidingView
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

      <Animated.View
        style={{
          height: topHeight,
          width: dimensions.window.width,
        }}
      >
        <ShowHTML
          html={rendered}
          style={{
            flex: 1,
            color: colors.text,
            height: topHeight,
            width: dimensions.window.width,
          }}
        />
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
      >
        <View
          style={{
            height: 15,
            width: dimensions.window.width,
            backgroundColor: isDividerClicked ? '#666' : '#262626'
          }}
        />
      </Animated.View>

      <Animated.View
        style={{
          height: dimensions.window.height - topHeight,
          width: dimensions.window.width,
        }}
      >
        <FileText
          multiline
          numberOfLines={4}
          onChangeText={text => setText(text)}
          value={text}
          style={{
            color: colors.text,
            backgroundColor: colors.card,

            height: dimensions.window.height - topHeight,
            width: dimensions.window.width,

            padding: 15,
            fontSize: 22,

            flex: 1,
          }}
        />
      </Animated.View>

    </KeyboardAvoidingView>
  )
}
