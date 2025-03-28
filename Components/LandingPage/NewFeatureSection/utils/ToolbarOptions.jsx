import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextEditor from './TextEditor';
import CodeEditor from './CodeEditor';
import ImageEditor from './ImageEditor';
import TableEditor from './TableEditor';
import DrawingEditor from './DrawingEditor';

// Main component that manages multiple editors
const MultiEditorContainer = () => {
  // State to track which editor is currently active
  const [activeEditor, setActiveEditor] = useState('text');
  // State to control toolbar visibility for text editor
  const [textToolbarVisible, setTextToolbarVisible] = useState(true);
  
  // References to editor components
  const textEditorRef = useRef(null);

  // Function to render the appropriate editor based on selection
  const renderEditor = () => {
    switch (activeEditor) {
      case 'text':
        return (
          <TextEditor 
            toolbarVisible={textToolbarVisible}
            setToolbarVisible={setTextToolbarVisible}
            ref={textEditorRef}
          />
        );
      case 'code':
        return <CodeEditor />;
      case 'image':
        return <ImageEditor />;
      case 'table':
        return <TableEditor />;
      case 'drawing':
        return <DrawingEditor />;
      default:
        return <TextEditor />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Editor Area */}
      <View style={styles.editorContainer}>
        {renderEditor()}
      </View>
      
      {/* Main Toolbar */}
      <View style={styles.toolbar}>
        {/* Text Editor Icon */}
        <TouchableOpacity
          style={[styles.toolbarIcon, activeEditor === 'text' && styles.activeIcon]}
          onPress={() => setActiveEditor('text')}
        >
          <Icon name="text-fields" size={24} color={activeEditor === 'text' ? "#6200ee" : "#555"} />
          <Text style={[styles.iconLabel, activeEditor === 'text' && styles.activeLabel]}>Text</Text>
        </TouchableOpacity>
        
        {/* Code Editor Icon */}
        <TouchableOpacity
          style={[styles.toolbarIcon, activeEditor === 'code' && styles.activeIcon]}
          onPress={() => setActiveEditor('code')}
        >
          <Icon name="code" size={24} color={activeEditor === 'code' ? "#6200ee" : "#555"} />
          <Text style={[styles.iconLabel, activeEditor === 'code' && styles.activeLabel]}>Code</Text>
        </TouchableOpacity>
        
        {/* Image Editor Icon */}
        <TouchableOpacity
          style={[styles.toolbarIcon, activeEditor === 'image' && styles.activeIcon]}
          onPress={() => setActiveEditor('image')}
        >
          <Icon name="image" size={24} color={activeEditor === 'image' ? "#6200ee" : "#555"} />
          <Text style={[styles.iconLabel, activeEditor === 'image' && styles.activeLabel]}>Image</Text>
        </TouchableOpacity>
        
        {/* Table Editor Icon */}
        <TouchableOpacity
          style={[styles.toolbarIcon, activeEditor === 'table' && styles.activeIcon]}
          onPress={() => setActiveEditor('table')}
        >
          <Icon name="grid-on" size={24} color={activeEditor === 'table' ? "#6200ee" : "#555"} />
          <Text style={[styles.iconLabel, activeEditor === 'table' && styles.activeLabel]}>Table</Text>
        </TouchableOpacity>
        
        {/* Drawing Editor Icon */}
        <TouchableOpacity
          style={[styles.toolbarIcon, activeEditor === 'drawing' && styles.activeIcon]}
          onPress={() => setActiveEditor('drawing')}
        >
          <Icon name="brush" size={24} color={activeEditor === 'drawing' ? "#6200ee" : "#555"} />
          <Text style={[styles.iconLabel, activeEditor === 'drawing' && styles.activeLabel]}>Draw</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Define CodeEditor component (stub)
const CodeEditor = () => {
  return (
    <View style={styles.editorPlaceholder}>
      <Text>Code Editor Component</Text>
      <Text style={styles.placeholderText}>This would contain a code editor with syntax highlighting</Text>
    </View>
  );
};

// Define ImageEditor component (stub)
const ImageEditor = () => {
  return (
    <View style={styles.editorPlaceholder}>
      <Text>Image Editor Component</Text>
      <Text style={styles.placeholderText}>This would contain image upload, cropping and filters</Text>
    </View>
  );
};

// Define TableEditor component (stub)
const TableEditor = () => {
  return (
    <View style={styles.editorPlaceholder}>
      <Text>Table Editor Component</Text>
      <Text style={styles.placeholderText}>This would contain table creation and formatting tools</Text>
    </View>
  );
};

// Define DrawingEditor component (stub)
const DrawingEditor = () => {
  return (
    <View style={styles.editorPlaceholder}>
      <Text>Drawing Editor Component</Text>
      <Text style={styles.placeholderText}>This would contain a canvas for drawing with various tools</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  editorContainer: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  toolbarIcon: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  activeIcon: {
    backgroundColor: '#f0e6ff',
  },
  iconLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#555',
  },
  activeLabel: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  editorPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeholderText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#666',
  },
});

export default MultiEditorContainer;

// DrawingEditor.js component
import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DrawingEditor = () => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [color, setColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [drawingMode, setDrawingMode] = useState('pencil'); // pencil, eraser, shapes etc.

  // Create PanResponder for drawing
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        const { locationX, locationY } = event.nativeEvent;
        setCurrentPath([{ x: locationX, y: locationY, color, strokeWidth, drawingMode }]);
      },
      onPanResponderMove: (event, gestureState) => {
        const { locationX, locationY } = event.nativeEvent;
        setCurrentPath(prevPath => [
          ...prevPath,
          { x: locationX, y: locationY, color, strokeWidth, drawingMode }
        ]);
      },
      onPanResponderRelease: () => {
        setPaths(prevPaths => [...prevPaths, currentPath]);
        setCurrentPath([]);
      },
    })
  ).current;

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
  };

  // Function to render all paths
  const renderPaths = () => {
    return paths.map((path, pathIndex) => (
      <View key={`path-${pathIndex}`}>
        {path.map((point, pointIndex) => {
          if (pointIndex === 0) return null;
          
          const prevPoint = path[pointIndex - 1];
          return (
            <View
              key={`line-${pathIndex}-${pointIndex}`}
              style={{
                position: 'absolute',
                left: prevPoint.x,
                top: prevPoint.y,
                width: point.x - prevPoint.x,
                height: point.strokeWidth,
                backgroundColor: point.color,
                transform: [
                  { translateX: 0 },
                  { translateY: -point.strokeWidth / 2 },
                  { rotate: `${Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x)}rad` },
                  { translateX: 0 },
                  { translateY: 0 },
                ],
                borderRadius: point.strokeWidth / 2,
              }}
            />
          );
        })}
      </View>
    ));
  };

  // Function to render current path
  const renderCurrentPath = () => {
    return currentPath.map((point, pointIndex) => {
      if (pointIndex === 0) return null;
      
      const prevPoint = currentPath[pointIndex - 1];
      return (
        <View
          key={`current-line-${pointIndex}`}
          style={{
            position: 'absolute',
            left: prevPoint.x,
            top: prevPoint.y,
            width: point.x - prevPoint.x,
            height: point.strokeWidth,
            backgroundColor: point.color,
            transform: [
              { translateX: 0 },
              { translateY: -point.strokeWidth / 2 },
              { rotate: `${Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x)}rad` },
              { translateX: 0 },
              { translateY: 0 },
            ],
            borderRadius: point.strokeWidth / 2,
          }}
        />
      );
    });
  };

  const colorOptions = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'
  ];

  return (
    <View style={styles.container}>
      {/* Drawing Canvas */}
      <View style={styles.canvas} {...panResponder.panHandlers}>
        {renderPaths()}
        {renderCurrentPath()}
      </View>
      
      {/* Drawing Tools */}
      <View style={styles.toolbar}>
        <View style={styles.toolsRow}>
          {/* Drawing Modes */}
          <TouchableOpacity
            style={[styles.toolButton, drawingMode === 'pencil' && styles.activeToolButton]}
            onPress={() => setDrawingMode('pencil')}
          >
            <Icon name="create" size={24} color="#444" />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.toolButton, drawingMode === 'eraser' && styles.activeToolButton]}
            onPress={() => {
              setDrawingMode('eraser');
              setColor('#FFFFFF');
            }}
          >
            <Icon name="format-color-reset" size={24} color="#444" />
          </TouchableOpacity>
          
          {/* Clear Canvas */}
          <TouchableOpacity
            style={styles.toolButton}
            onPress={clearCanvas}
          >
            <Icon name="delete" size={24} color="#444" />
          </TouchableOpacity>
        </View>
        
        {/* Color Selection */}
        <View style={styles.colorRow}>
          {colorOptions.map((clr) => (
            <TouchableOpacity
              key={clr}
              style={[
                styles.colorButton,
                { backgroundColor: clr },
                color === clr && styles.activeColorButton
              ]}
              onPress={() => setColor(clr)}
            />
          ))}
        </View>
        
        {/* Stroke Width */}
        <View style={styles.strokeRow}>
          {[1, 3, 5, 8].map((width) => (
            <TouchableOpacity
              key={width}
              style={[
                styles.strokeButton,
                strokeWidth === width && styles.activeStrokeButton
              ]}
              onPress={() => setStrokeWidth(width)}
            >
              <View style={{
                height: width,
                width: 20,
                backgroundColor: '#444',
                borderRadius: width / 2
              }} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvas: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  strokeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  toolButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  activeToolButton: {
    backgroundColor: '#e6f2ff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeColorButton: {
    borderWidth: 2,
    borderColor: '#007AFF',
    transform: [{ scale: 1.2 }],
  },
  strokeButton: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  activeStrokeButton: {
    backgroundColor: '#e6f2ff',
    borderRadius: 15,
  },
});

// TableEditor.js component 
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TableEditor = () => {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const [cellData, setCellData] = useState({});
  
  // Generate empty cell data
  const initializeTable = (r, c) => {
    const data = {};
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        data[`${i}-${j}`] = '';
      }
    }
    return data;
  };
  
  // Initialize table on first render
  useState(() => {
    setCellData(initializeTable(rows, columns));
  }, []);
  
  // Update a cell's content
  const updateCell = (rowIndex, colIndex, value) => {
    setCellData(prev => ({
      ...prev,
      [`${rowIndex}-${colIndex}`]: value
    }));
  };
  
  // Add new row
  const addRow = () => {
    const newRows = rows + 1;
    const newData = { ...cellData };
    
    for (let j = 0; j < columns; j++) {
      newData[`${rows}-${j}`] = '';
    }
    
    setRows(newRows);
    setCellData(newData);
  };
  
  // Add new column
  const addColumn = () => {
    const newColumns = columns + 1;
    const newData = { ...cellData };
    
    for (let i = 0; i < rows; i++) {
      newData[`${i}-${columns}`] = '';
    }
    
    setColumns(newColumns);
    setCellData(newData);
  };
  
  // Remove last row
  const removeRow = () => {
    if (rows <= 1) return;
    
    const newRows = rows - 1;
    const newData = { ...cellData };
    
    for (let j = 0; j < columns; j++) {
      delete newData[`${newRows}-${j}`];
    }
    
    setRows(newRows);
    setCellData(newData);
  };
  
  // Remove last column
  const removeColumn = () => {
    if (columns <= 1) return;
    
    const newColumns = columns - 1;
    const newData = { ...cellData };
    
    for (let i = 0; i < rows; i++) {
      delete newData[`${i}-${newColumns}`];
    }
    
    setColumns(newColumns);
    setCellData(newData);
  };
  
  return (
    <View style={styles.container}>
      {/* Table Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={addRow}>
            <Icon name="add" size={18} />
            <Text>Add Row</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={addColumn}>
            <Icon name="add" size={18} />
            <Text>Add Column</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, rows <= 1 && styles.disabledButton]} 
            onPress={removeRow}
            disabled={rows <= 1}
          >
            <Icon name="remove" size={18} />
            <Text>Remove Row</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, columns <= 1 && styles.disabledButton]} 
            onPress={removeColumn}
            disabled={columns <= 1}
          >
            <Icon name="remove" size={18} />
            <Text>Remove Column</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Table */}
      <ScrollView style={styles.tableScrollView}>
        <ScrollView horizontal>
          <View style={styles.tableContainer}>
            {Array(rows).fill().map((_, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.tableRow}>
                {Array(columns).fill().map((_, colIndex) => (
                  <View key={`cell-${rowIndex}-${colIndex}`} style={styles.tableCell}>
                    <TextInput
                      style={styles.cellInput}
                      value={cellData[`${rowIndex}-${colIndex}`] || ''}
                      onChangeText={(text) => updateCell(rowIndex, colIndex, text)}
                      placeholder={`R${rowIndex}C${colIndex}`}
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  controlsContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  disabledButton: {
    opacity: 0.5,
  },
  tableScrollView: {
    flex: 1,
  },
  tableContainer: {
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    width: 120,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    padding: 4,
  },
  cellInput: {
    flex: 1,
    fontSize: 14,
  },
});

// CodeEditor.js component
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';

const CodeEditor = () => {
  const [code, setCode] = useState('// Write your code here\n\nfunction example() {\n  console.log("Hello, world!");\n}');
  const [language, setLanguage] = useState('javascript');
  
  const languages = [
    'javascript', 'python', 'java', 'html', 'css'
  ];
  
  return (
    <View style={styles.container}>
      {/* Language Selection */}
      <View style={styles.languageBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {languages.map(lang => (
            <TouchableOpacity
              key={lang}
              style={[
                styles.languageButton,
                language === lang && styles.selectedLanguage
              ]}
              onPress={() => setLanguage(lang)}
            >
              <Text 
                style={[
                  styles.languageText,
                  language === lang && styles.selectedLanguageText
                ]}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* Code Editor */}
      <ScrollView style={styles.codeContainer}>
        <TextInput
          style={styles.codeInput}
          value={code}
          onChangeText={setCode}
          multiline={true}
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          keyboardType="default"
        />
      </ScrollView>
      
      {/* Button Bar */}
      <View style={styles.buttonBar}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Run</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Format</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Copy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  languageBar: {
    backgroundColor: '#2d2d2d',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
  },
  selectedLanguage: {
    backgroundColor: '#0e639c',
  },
  languageText: {
    color: '#cccccc',
    fontSize: 14,
  },
  selectedLanguageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  codeContainer: {
    flex: 1,
    padding: 10,
  },
  codeInput: {
    color: '#d4d4d4',
    fontFamily: 'Courier',
    fontSize: 14,
    padding: 0,
  },
  buttonBar: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    padding: 10,
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#0e639c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

// ImageEditor.js component
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, Slider } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [activeTab, setActiveTab] = useState('adjust');
  
  const tabs = [
    { id: 'adjust', icon: 'tune', label: 'Adjust' },
    { id: 'filters', icon: 'filter', label: 'Filters' },
    { id: 'crop', icon: 'crop', label: 'Crop' },
    { id: 'text', icon: 'text-fields', label: 'Text' },
  ];
  
  const filters = [
    'Normal', 'Grayscale', 'Sepia', 'Vintage', 'Warm', 'Cool', 'Dramatic'
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'adjust':
        return (
          <View style={styles.tabContent}>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Brightness: {brightness}%</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={200}
                value={brightness}
                onValueChange={setBrightness}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#d3d3d3"
                step={1}
              />
            </View>
            
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Contrast: {contrast}%</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={200}
                value={contrast}
                onValueChange={setContrast}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#d3d3d3"
                step={1}
              />
            </View>
            
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Saturation: {saturation}%</Text>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={200}
                value={saturation}
                onValueChange={setSaturation}
                minimumTrackTintColor="#007AFF"
                maximumTrackTintColor="#d3d3d3"
                step={1}
              />
            </View>
          </View>
        );
        
      case 'filters':
        return (
          <View style={styles.tabContent}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filters.map((filter) => (
                <TouchableOpacity key={filter} style={styles.filterItem}>
                  <View style={styles.filterPreview}>
                    {/* Preview would show image with filter applied */}
                  </View>
                  <Text style={styles.filterName}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        );
        
      case 'crop':
        return (
          <View style={styles.tabContent}>
            <View style={styles.cropControls}>
              <TouchableOpacity style={styles.cropButton}>
                <Icon name="crop-free" size={24} color="#007AFF" />
                <Text style={styles.cropButtonText}>Free</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cropButton}>
                <Icon name="crop-square" size={24} color="#007AFF" />
                <Text style={styles.cropButtonText}>1:1</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cropButton}>
                <Icon name="crop-7-5" size={24} color="#007AFF" />
                <Text style={styles.cropButtonText}>4:3</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.cropButton}>
                <Icon name="crop-16-9" size={24} color="#007AFF" />
                <Text style={styles.cropButtonText}>16:9</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
        
      case 'text':
        return (
          <View style={styles.tabContent}>
            <TouchableOpacity style={styles.addTextButton}>
              <Icon name="add" size={24} color="#ffffff" />
              <Text style={styles.addTextButtonText}>Add Text</Text>
            </TouchableOpacity>
            
            <View style={styles.textControls}>
              <TouchableOpacity style={styles.textControlButton}>
                <Icon name="format-bold" size