import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, Text, Platform, Animated, PanResponder, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import RNFS from 'react-native-fs';

import org from "org";

import { useFile, useDimensions } from '../Hooks/index.js';
import { FileText, ShowHTML } from '../components/index.js';

export default function File({ route, navigation }) {
  const { colors } = useTheme();
  const { path } = route.params;
  const { text, setText } = useFile(path);
  const dimensions = useDimensions();

  const [rendered, setRendered] = useState('');
  const [topHeight, setTopHeight] = useState(dimensions.window.height / 4);
  const [isDividerClicked, setIsDividerClicked] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

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
  }, [text]);

  useEffect(() => {
    const timer = setTimeout(() => {
      RNFS.writeFile(path, text, 'utf8')
        .then((success) => {
          console.log('FILE WRITTEN!');
        })
        .catch((err) => {
          console.log(err.message);
        });
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

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

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            backgroundColor: "#fff", // for the rendering why not
          }}
        />
      </KeyboardAvoidingView>

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

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
        style={{
          height: dimensions.window.height - topHeight,
          width: dimensions.window.width,
        }}
      >
          <FileText
            onChangeText={text => setText(text)}
            value={text}
            style={{
              textAlignVertical: 'top',
              color: colors.text,
              padding: 15,
              fontSize: 20,
            }}
          />
      </KeyboardAvoidingView>
    </View>
  )
}
