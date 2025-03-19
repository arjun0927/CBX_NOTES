import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { rMS } from '../../../Utils/Responsive';

const CustomCheckbox = ({ 
  value, 
  isChecked = false, 
  onToggle, 
  nested = false,
  containerStyle = {}
}) => {
  const [checked, setChecked] = useState(isChecked);

  const handlePress = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        nested && styles.nestedContainer,
        containerStyle
      ]} 
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && <View style={styles.checkmark} />}
      </View>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  nestedContainer: {
    marginLeft: 25,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#606160',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#606160',
  },
  checkmark: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  }
});

export default CustomCheckbox;