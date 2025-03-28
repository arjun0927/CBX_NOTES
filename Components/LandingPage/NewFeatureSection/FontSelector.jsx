// 4. FontSelector Component
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const FontSelector = ({ currentFont, onSelectFont }) => {
  const fontOptions = [
    { label: 'Arial', value: 'arial' },
    { label: 'Times', value: 'times' },
    { label: 'Courier', value: 'courier' },
    { label: 'Georgia', value: 'georgia' },
    { label: 'Verdana', value: 'verdana' }
  ];

  return (
    <View style={styles.dropdown}>
      <ScrollView>
        {fontOptions.map((font) => (
          <TouchableOpacity
            key={font.value}
            style={[
              styles.dropdownItem,
              currentFont === font.value && styles.activeItem
            ]}
            onPress={() => onSelectFont(font.value)}
          >
            <Text style={{
              fontFamily: font.value === 'arial' ? 'Arial' :
                font.value === 'times' ? 'Times New Roman' :
                  font.value === 'courier' ? 'Courier' :
                    font.value === 'georgia' ? 'Georgia' : 'Verdana'
            }}>{font.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// 5. SizeSelector Component
const SizeSelector = ({ currentSize, onSelectSize }) => {
  const sizeOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }
  ];

  return (
    <View style={styles.dropdown}>
      <ScrollView>
        {sizeOptions.map((size) => (
          <TouchableOpacity
            key={size.value}
            style={[
              styles.dropdownItem,
              currentSize === size.value && styles.activeItem
            ]}
            onPress={() => onSelectSize(size.value)}
          >
            <Text style={{ fontSize: 14 }}>{size.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    width: 110,
    maxHeight: 200,
    zIndex: 100000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activeItem: {
    backgroundColor: '#e6f2ff',
  },
});

export { FontSelector, SizeSelector };