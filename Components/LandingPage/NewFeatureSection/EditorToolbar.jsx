import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList, ScrollView } from 'react-native';

// You would need to import your actual icons here
// This is a placeholder - replace with your actual icon library
// For example: import { Icon } from 'your-icon-library';

const EditorToolbar = ({ onPressFormat }) => {
  const [showFontModal, setShowFontModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  
  const fonts = [
    { label: 'Arial', value: 'arial' },
    { label: 'Times', value: 'times' },
    { label: 'Courier', value: 'courier' },
    { label: 'Georgia', value: 'georgia' },
    { label: 'Verdana', value: 'verdana' }
  ];
  
  const sizes = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }
  ];
  
  const colors = [
    { label: 'Black', value: '#000000' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Green', value: '#00FF00' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Yellow', value: '#FFFF00' },
    { label: 'Purple', value: '#800080' },
    { label: 'Orange', value: '#FFA500' },
    { label: 'Gray', value: '#808080' }
  ];
  
  return (
    <View style={styles.toolbarContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Bold */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => onPressFormat('bold')}
        >
          <Text style={styles.toolbarButtonText}>B</Text>
        </TouchableOpacity>
        
        {/* Italic */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => onPressFormat('italic')}
        >
          <Text style={styles.toolbarButtonText}>I</Text>
        </TouchableOpacity>
        
        {/* Underline */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => onPressFormat('underline')}
        >
          <Text style={styles.toolbarButtonText}>U</Text>
        </TouchableOpacity>
        
        {/* Strikethrough */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => onPressFormat('strike')}
        >
          <Text style={styles.toolbarButtonText}>S</Text>
        </TouchableOpacity>
        
        {/* Font Family */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => setShowFontModal(true)}
        >
          <Text style={styles.toolbarButtonText}>A</Text>
        </TouchableOpacity>
        
        {/* Font Size */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => setShowSizeModal(true)}
        >
          <Text style={styles.toolbarButtonText}>TT</Text>
        </TouchableOpacity>
        
        {/* Text Color */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => setShowColorModal(true)}
        >
          <Text style={styles.toolbarButtonText}>🎨</Text>
        </TouchableOpacity>
        
        {/* Bullet List */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => onPressFormat('list', 'bullet')}
        >
          <Text style={styles.toolbarButtonText}>•</Text>
        </TouchableOpacity>
        
        {/* Number List */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => onPressFormat('list', 'ordered')}
        >
          <Text style={styles.toolbarButtonText}>1.</Text>
        </TouchableOpacity>
        
        {/* Link */}
        <TouchableOpacity 
          style={styles.toolbarButton} 
          onPress={() => setShowLinkModal(true)}
        >
          <Text style={styles.toolbarButtonText}>🔗</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Font Family Modal */}
      <Modal
        visible={showFontModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFontModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Font</Text>
            <FlatList
              data={fonts}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onPressFormat('font', item.value);
                    setShowFontModal(false);
                  }}
                >
                  <Text style={[styles.modalItemText, { fontFamily: item.label }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFontModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Font Size Modal */}
      <Modal
        visible={showSizeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSizeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Size</Text>
            <FlatList
              data={sizes}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onPressFormat('size', item.value);
                    setShowSizeModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>
                    Size {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSizeModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Color Modal */}
      <Modal
        visible={showColorModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowColorModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Color</Text>
            <FlatList
              data={colors}
              keyExtractor={(item) => item.value}
              numColumns={4}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.colorItem, { backgroundColor: item.value }]}
                  onPress={() => {
                    onPressFormat('color', item.value);
                    setShowColorModal(false);
                  }}
                />
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowColorModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Link Modal */}
      <Modal
        visible={showLinkModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLinkModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Insert Link</Text>
            {/* This would typically have a TextInput for the URL */}
            {/* For simplicity, we just have buttons for demo purposes */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                // Simplified - normally would grab URL from TextInput
                onPressFormat('link', 'https://example.com');
                setShowLinkModal(false);
              }}
            >
              <Text style={styles.modalButtonText}>Insert Link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowLinkModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  toolbarButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  toolbarButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    fontSize: 16,
  },
  colorItem: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  modalCloseButtonText: {
    fontSize: 16,
    textAlign: 'center',
  }
});

export default EditorToolbar;