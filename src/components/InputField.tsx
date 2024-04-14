// InputField.js

import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { fonts, fontSizes, theme } from '../theme/theme';

const InputField = ({placeholder, onChangeText, value,}) => {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.LightGray,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: fontSizes.medium,
    marginBottom: 10,
    fontFamily:fonts.regular,
    color:'black',
  },
});

export default InputField;
