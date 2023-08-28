import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Colors } from '../constants/colors';

export default function Button({ onPress, children }) {
  return (
    <Pressable
      styles={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    horizontalPadding: 12,
    verticalPadding: 8,
    margin: 4,
    backgroundColor: Colors.primary800,
    color: Colors.primary50,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
