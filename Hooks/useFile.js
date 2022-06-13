import React, { useState, useEffect } from 'react';
import RNFS from 'react-native-fs';
import { readFile } from '../Utils/index.js';

export default function useFile(path) {
  const [text, setText] = useState('');

  useEffect(() => {
    readFile(path).then((result) => setText(result));
  }, []);

  return {
    'text': text,
    'setText': setText,
  }
}
