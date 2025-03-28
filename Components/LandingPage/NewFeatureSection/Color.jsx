// 6. ColorSelector Component
import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Text } from 'react-native';

const ColorSelector = ({ currentColor, onSelectColor }) => {
  const colorOptions = [
    { value: '#000000' }, // Black
    { value: '#FF0000' }, // Red
    { value: '#008000' }, // Green
    { value: '#0000FF' }, // Blue
    { value: '#800080' }, // Purple
    { value: '#FFA500' }, // Orange
    { value: '#FF00FF' }, // Magenta
    { value: '#00FFFF' }, // Cyan
    { value: '#FFFF00' }, // Yellow
    { value: '#800000' }, // Maroon
    { value: '#008080' }, // Teal
    { value: '#000080' }, // Navy
    { value: '#808080' }, // Gray
    { value: '#C0C0C0' }, // Silver
    { value: '#FF4500' }, // Orange Red
    { value: '#DA70D6' }, // Orchid
    { value: '#6A5ACD' }, // Slate Blue
    { value: '#32CD32' }, // Lime Green
    { value: '#8B4513' }, // Saddle Brown
    { value: '#4B0082' }, // Indigo
    { value: '#2E8B57' }, // Sea Green
    { value: '#D2691E' }, // Chocolate
    { value: '#9400D3' }  // Dark Violet
  ];

  return (
    <View style={styles.colorPalette}>
      <View style={styles.colorPaletteContainer}>
        <FlatList
          data={colorOptions}
          numColumns={4}
          keyExtractor={(item) => item.value}
          scrollEnabled={true}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.colorPaletteContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.colorItem,
                { backgroundColor: item.value },
                currentColor === item.value && styles.selectedColorItem
              ]}
              onPress={() => onSelectColor(item.value)}
            />
          )}
        />
      </View>
    </View>
  );
};

// 7. LinkInputDialog Component
import { TextInput } from 'react-native';

const LinkInputDialog = ({ 
  linkUrl, 
  setLinkUrl, 
  linkText, 
  setLinkText, 
  handleLinkSubmit, 
  onCancel 
}) => {
  return (
    <View style={styles.linkInputContainer}>
      <TextInput
        style={styles.linkInput}
        placeholder="URL"
        value={linkUrl}
        onChangeText={setLinkUrl}
        autoCapitalize="none"
        keyboardType="url"
        autoFocus={true}
      />
      <TextInput
        style={styles.linkInput}
        placeholder="Link Text"
        value={linkText}
        onChangeText={setLinkText}
        autoCapitalize="sentences"
      />
      <View style={styles.linkButtons}>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={handleLinkSubmit}
        >
          <Text style={styles.linkButtonText}>INSERT LINK</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.linkButton, styles.cancelButton]}
          onPress={onCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorPalette: {
    position: 'absolute',
    bottom: 50,
    left: -50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    width: 200,
    height: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  colorPaletteContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  colorPaletteContent: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorItem: {
    width: 34,
    height: 34,
    borderRadius: 17,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  linkInputContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 70,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  linkInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  linkButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  linkButton: {
    backgroundColor: 'rgb(152, 127, 168)',
    borderRadius: 8,
    padding: 8,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  linkButtonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-Medium'
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#444',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  }
});

export { ColorSelector, LinkInputDialog };