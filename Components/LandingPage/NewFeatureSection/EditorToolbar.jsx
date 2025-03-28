// 2. EditorToolbar Component
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontSelector } from './FontSelector';
import { SizeSelector } from './FontSelector';
import { ColorSelector } from './Color';
import FormatButtons from './FormatButtons';

const EditorToolbar = ({ 
  toolbarHeight, 
  toolbarAnimation, 
  formatState, 
  executeCommand, 
  focusEditor,
  setShowLinkInput 
}) => {
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const getListIcon = () => {
    if (formatState.list === 'bullet') {
      return "format-list-bulleted";
    } else if (formatState.list === 'ordered') {
      return "format-list-numbered";
    } else {
      return "format-list-bulleted";
    }
  };

  const closeAllMenus = () => {
    setShowFontMenu(false);
    setShowSizeMenu(false);
    setShowColorMenu(false);
  };

  return (
    <Animated.View style={[
      styles.toolbar,
      {
        height: toolbarHeight,
        opacity: toolbarAnimation
      }
    ]}>
      {/* Font Family */}
      <View>
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => {
            setShowFontMenu(!showFontMenu);
            setShowSizeMenu(false);
            setShowColorMenu(false);
            setShowLinkInput(false);
          }}
        >
          <Icon name="font-download" size={24} color="#444" />
        </TouchableOpacity>

        {showFontMenu && (
          <FontSelector
            currentFont={formatState.font}
            onSelectFont={(font) => {
              executeCommand('font', font);
              setShowFontMenu(false);
              focusEditor();
            }}
          />
        )}
      </View>

      {/* Font Size */}
      <View>
        <TouchableOpacity
          style={styles.toolButton}
          onPress={() => {
            setShowSizeMenu(!showSizeMenu);
            setShowFontMenu(false);
            setShowColorMenu(false);
            setShowLinkInput(false);
          }}
        >
          <Icon name="format-size" size={24} color="#444" />
        </TouchableOpacity>

        {showSizeMenu && (
          <SizeSelector
            currentSize={formatState.size}
            onSelectSize={(size) => {
              executeCommand('size', size);
              setShowSizeMenu(false);
              focusEditor();
            }}
          />
        )}
      </View>

      {/* Text Color */}
      <View>
        <TouchableOpacity
          style={[styles.toolButton, { position: 'relative' }]}
          onPress={() => {
            setShowColorMenu(!showColorMenu);
            setShowFontMenu(false);
            setShowSizeMenu(false);
            setShowLinkInput(false);
          }}
        >
          <Icon name="format-color-text" size={24} color="#444" />
        </TouchableOpacity>

        {showColorMenu && (
          <ColorSelector
            currentColor={formatState.color}
            onSelectColor={(color) => {
              executeCommand('color', color);
              setShowColorMenu(false);
              focusEditor();
            }}
          />
        )}
      </View>

      {/* Text Formatting Buttons */}
      <FormatButtons 
        formatState={formatState} 
        executeCommand={executeCommand} 
      />

      {/* Toggle List (Bullet/Number) */}
      <TouchableOpacity
        style={[styles.toolButton, formatState.list && styles.activeButton]}
        onPress={() => executeCommand('toggleList')}
      >
        <Icon name={getListIcon()} size={24} color="#444" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.toolButton}
        onPress={() => {
          closeAllMenus();
          setShowLinkInput(true);
        }}
      >
        <Icon name="link" size={24} color="#444" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    padding: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  toolButton: {
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activeButton: {
    // backgroundColor: '#e6f2ff',
  },
});

export default EditorToolbar;