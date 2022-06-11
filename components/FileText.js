import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, ScrollView } from 'react-native';

export default function FileText({ onChangeText, value, style }, props) {
  const scrollViewRef = useRef();
  return (
    <ScrollView
      style={style}
      // ref={scrollViewRef}
      // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({animated: true})}>
    >
      <TextInput
        style={style}
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
