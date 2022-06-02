import * as React from 'react';
import { useTheme } from '@react-navigation/native';
import MathJax from 'react-native-mathjax';
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
      <MathJax
        source={{
          html: html,
        }}
        mathJaxOptions={{
          messageStyle: "none",
          extensions: ["tex2jax.js"],
          jax: ["input/TeX", "output/HTML-CSS"],
          tex2jax: {
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            displayMath: [
              ["$$", "$$"],
              ["\\[", "\\]"],
            ],
            processEscapes: true,
          },
          TeX: {
            extensions: [
              "AMSmath.js",
              "AMSsymbols.js",
              "noErrors.js",
              "noUndefined.js",
            ],
          },
        }}
      />
    </SafeAreaView>
  )
}
