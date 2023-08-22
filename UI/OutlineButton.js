import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
export default function OutlineButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}>
      <Ionicons
        style={styles.icon}
        name={icons}
        size={18}
        colors={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: 'center',
    alignItem: 'center',
    borderWidth: 1,
    colors: Colors.primary500,
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
  },
});
