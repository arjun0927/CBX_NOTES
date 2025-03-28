import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const Tasks = () => {
  const { width } = useWindowDimensions();
  const [rawText, setRawText] = useState(''); 
  const [htmlContent, setHtmlContent] = useState('');
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [activeStyle, setActiveStyle] = useState(null); // Track active style
  const textInputRef = useRef(null);

  // Apply style button click
  const toggleStyle = (style) => {
    setActiveStyle(activeStyle === style ? null : style); // Toggle active style
  };

  // Handle text input change
  const handleTextChange = (text) => {
    let formattedText = text;
    
    if (activeStyle) {
      formattedText = `<${activeStyle}>${text}</${activeStyle}>`; // Apply active style
    }

    setRawText(text);
    setHtmlContent(formattedText);
  };

  return (
    <View style={styles.container}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        {['b', 'i', 'u', 'strike'].map((style) => (
          <TouchableOpacity
            key={style}
            onPress={() => toggleStyle(style)}
            style={[styles.button, activeStyle === style && styles.activeButton]}>
            <Text style={styles.buttonText}>
              {style.charAt(0).toUpperCase()} {/* B, I, U, S */}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Text Input */}
      <TextInput
        ref={textInputRef}
        style={styles.input}
        multiline
        value={rawText}
        onChangeText={handleTextChange}
        selection={selection}
        onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
      />

      {/* Preview */}
      <Text style={styles.previewHeader}>Preview:</Text>
      <ScrollView style={styles.htmlContainer}>
        <RenderHtml contentWidth={width} source={{ html: `<div style="font-size:18px;">${htmlContent}</div>` }} />
      </ScrollView>

      {/* Debug HTML */}
      <View style={styles.debugContainer}>
        <Text style={styles.debugHeader}>HTML Content:</Text>
        <Text style={styles.debugText}>{htmlContent}</Text>
      </View>
    </View>
  );
};

export default Tasks;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
  },
  button: { padding: 10, backgroundColor: '#ddd', borderRadius: 5 },
  activeButton: { backgroundColor: '#aaa' }, // Active button styling
  buttonText: { fontWeight: 'bold', fontSize: 16 },
  input: { borderWidth: 1, borderColor: '#999', padding: 10, minHeight: 100, fontSize: 16, textAlignVertical: 'top' },
  previewHeader: { marginTop: 15, marginBottom: 5, fontSize: 16, fontWeight: 'bold' },
  htmlContainer: { height: 150, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5 },
  debugContainer: { marginTop: 15, padding: 10, backgroundColor: '#f5f5f5', borderRadius: 5 },
  debugHeader: { fontWeight: 'bold', marginBottom: 5 },
  debugText: { fontSize: 12, fontFamily: 'monospace' }
});
