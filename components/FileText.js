import * as React from 'react';
import { View, TextInput } from 'react-native';

export default function FileText(props) {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
    />
  )
}
