import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView } from 'react-native';

export default function FileText({ onChangeText, value, style }, props) {
  return (
    <ScrollView
      style={style}
    >
      <TextInput
        style={style}
        autoCorrect={false}
        onChangeText={onChangeText}
        scrollEnabled={true}
        value={value}
        multiline={true}
        numberOfLines={5}
        placeholder="Start typing!"
        autoFocus={true}
        editable
      />
    </ScrollView>
  )
}
