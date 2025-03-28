// 3. FormatButtons Component
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FormatButtons = ({ formatState, executeCommand }) => {
  return (
    <>
      {/* Bold */}
      <TouchableOpacity
        style={[styles.toolButton, formatState.bold && styles.activeButton]}
        onPress={() => executeCommand('bold')}
      >
        <Icon name="format-bold" size={24} color="#444" />
      </TouchableOpacity>

      {/* Italic */}
      <TouchableOpacity
        style={[styles.toolButton, formatState.italic && styles.activeButton]}
        onPress={() => executeCommand('italic')}
      >
        <Icon name="format-italic" size={24} color="#444" />
      </TouchableOpacity>

      {/* Underline */}
      <TouchableOpacity
        style={[styles.toolButton, formatState.underline && styles.activeButton]}
        onPress={() => executeCommand('underline')}
      >
        <Icon name="format-underlined" size={24} color="#444" />
      </TouchableOpacity>

      {/* Strikethrough */}
      <TouchableOpacity
        style={[styles.toolButton, formatState.strike && styles.activeButton]}
        onPress={() => executeCommand('strike')}
      >
        <Icon name="format-strikethrough" size={24} color="#444" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  toolButton: {
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activeButton: {
    // backgroundColor: '#e6f2ff',
  },
});

export default FormatButtons;