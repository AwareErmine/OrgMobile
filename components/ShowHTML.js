import React, { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import MathJax from 'react-native-mathjax';
import { StyleSheet, ScrollView, View } from 'react-native';

export default function ShowHTML({ html, style }) {
  const { colors } = useTheme();
  return (
    <ScrollView
      style={style}
    >
      <MathJax
        html={html}
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
          // loader: { load: ["[tex]/html"] },
          // tex: {
          //   packages: { "[+]": ["html"] },
          //   inlineMath: [["$", "$"]],
          //   displayMath: [["\\(", "\\)"]]
          // }
        }}
      />
    </ScrollView>
  )
}
