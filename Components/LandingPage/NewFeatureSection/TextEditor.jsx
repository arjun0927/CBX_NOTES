import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, ScrollView, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native';

const TextEditor = ({ props, ref }) => {
  const [content, setContent] = useState('');
  const [editorReady, setEditorReady] = useState(false);
  const [selectedFont, setSelectedFont] = useState('arial');
  const [selectedSize, setSelectedSize] = useState('3');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [listType, setListType] = useState(null); // Track current list type

  const [toolbarVisible, setToolbarVisible] = useState(false);
  // Add animation value
  const toolbarAnimation = useRef(new Animated.Value(0)).current;
  const webViewRef = useRef(null);

  useImperativeHandle(ref, () => ({
    toggleToolbar: () => {
      const newVisibility = !toolbarVisible;
      setToolbarVisible(newVisibility);

      // Animate the toolbar
      Animated.timing(toolbarAnimation, {
        toValue: newVisibility ? 1 : 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    }
  }));

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
  <style>
    body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
    }
    
    #editor-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    #editor {
      flex: 1;
      overflow-y: auto;
      min-height: 200px;
      font-size: 16px;
    }
    
    /* Hide the default toolbar */
    .ql-toolbar.ql-snow {
      display: none;
    }
    
    /* Define font family classes */
    .ql-editor .ql-font-arial {
      font-family: 'Arial', sans-serif;
    }
    
    .ql-editor .ql-font-times {
      font-family: 'Times New Roman', Times, serif;
    }
    
    .ql-editor .ql-font-courier {
      font-family: 'Courier New', Courier, monospace;
    }
    
    .ql-editor .ql-font-georgia {
      font-family: 'Georgia', serif;
    }
    
    .ql-editor .ql-font-verdana {
      font-family: 'Verdana', sans-serif;
    }
    
    /* Make sure content is visible */
    .ql-container.ql-snow {
      border: none;
      height: 100%;
    }
    
    .ql-editor {
      padding: 12px;
      min-height: 200px;
    }
    
    /* Define numeric font size classes */
    .ql-editor .ql-size-1 {
      font-size: 10px;
    }
    .ql-editor .ql-size-2 {
      font-size: 14px;
    }
    .ql-editor .ql-size-3 {
      font-size: 18px;
    }
    .ql-editor .ql-size-4 {
      font-size: 24px;
    }
    .ql-editor .ql-size-5 {
      font-size: 32px;
    }
  </style>
</head>
<body>
  <div id="editor-container">
    <div id="editor"></div>
  </div>
  
  <script>
    // Size format
    const Size = Quill.import('formats/size');
    Size.whitelist = ['1', '2', '3', '4', '5'];
    Quill.register(Size, true);
    
    // Add font format support
    const Font = Quill.import('formats/font');
    Font.whitelist = ['arial', 'times', 'courier', 'georgia', 'verdana'];
    Quill.register(Font, true);
    
    // Initialize Quill editor with hidden toolbar
    var quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: false // Hide default toolbar
      },
      formats: ['bold', 'italic', 'underline', 'strike', 'font', 'size', 'list', 'link', 'color'],
      placeholder: 'Write something here...'
    });
    
    // Function to get editor content and send to React Native
    function getEditorContent() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'content',
        data: quill.root.innerHTML
      }));
    }
    
    // Send content when editor changes
    quill.on('text-change', function() {
      getEditorContent();
      
      // Also send the current format
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'format',
        data: quill.getFormat()
      }));
    });
    
    // Send format when selection changes
    quill.on('selection-change', function(range) {
      if (range) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'format',
          data: quill.getFormat()
        }));
      }
    });
    
    // Function to format text based on command received from React Native
    function executeCommand(command, value) {
      const range = quill.getSelection() || { index: 0, length: 0 };
      
      // Make sure we have focus before executing any commands
      if (!range.length && command !== 'link') {
        quill.focus();
      }
      
      switch(command) {
        case 'bold':
          quill.format('bold', !quill.getFormat(range).bold);
          break;
        case 'italic':
          quill.format('italic', !quill.getFormat(range).italic);
          break;
        case 'underline':
          quill.format('underline', !quill.getFormat(range).underline);
          break;
        case 'strike':
          quill.format('strike', !quill.getFormat(range).strike);
          break;
        case 'font':
          quill.format('font', value);
          break;
        case 'size':
          quill.format('size', value);
          break;
        case 'color':
          quill.format('color', value);
          break;
        case 'list':
          const currentList = quill.getFormat(range).list;
          if (currentList === value) {
            quill.format('list', false);
          } else {
            quill.format('list', value);
          }
          break;
        case 'toggleList':
  const currentListType = quill.getFormat(range).list;
  console.log('Current list type:', currentListType);
  
  if (!currentListType) {
    quill.format('list', 'bullet');
    console.log('Setting list to bullet');
  } else if (currentListType === 'bullet') {
    quill.format('list', 'ordered');
    console.log('Setting list to ordered');
  } else {
    quill.format('list', false);
    console.log('Removing list formatting');
  }
  
  // Force refresh of format
  setTimeout(() => {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'format',
      data: quill.getFormat()
    }));
  }, 50);
  break;
        case 'link':
          if (value) {
            // If there's text selected, apply link to selection
            if (range.length > 0) {
              quill.format('link', value);
            } else {
              // If no text is selected, insert the URL as a clickable link
              quill.insertText(range.index, value, {
                'link': value
              });
            }
          } else {
            quill.format('link', false);
          }
          break;
      }
      
      // Send back the updated format
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'format',
        data: quill.getFormat(range)
      }));
      
      // Focus the editor after executing command
      quill.focus();
    }
    
    // Set up message listener for commands from React Native
    window.addEventListener('message', function(event) {
      try {
        const message = JSON.parse(event.data);
        if (message.type === 'command') {
          executeCommand(message.command, message.value);
        } else if (message.type === 'getFormat') {
          const range = quill.getSelection() || { index: 0, length: 0 };
          // Send current format back to React Native
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'format',
            data: quill.getFormat(range)
          }));
        }
      } catch (e) {
        console.error('Error processing command', e);
      }
    });
    
    // Focus the editor to make sure it's active
    quill.focus();
    
    // Let React Native know the editor is ready
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'ready',
      message: 'Editor initialized'
    }));
  </script>
</body>
</html>
  `;

  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    list: null,
    font: 'arial',
    size: '3',
    color: '#000000'
  });

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      if (data.type === 'ready') {
        console.log("Editor initialized:", data.message);
        setEditorReady(true);
        // Get initial format
        getFormat();
      } else if (data.type === 'content') {
        setContent(data.data);
      } else if (data.type === 'format') {
        setFormatState(prevState => ({
          ...prevState,
          ...data.data
        }));

        // Update list type state if list format changed
        if (data.data.hasOwnProperty('list')) {
          setListType(data.data.list);
        }
      }
    } catch (e) {
      console.error("Error parsing editor message", e);
    }
  };

  const executeCommand = (command, value = null) => {
    if (!webViewRef.current || !editorReady) return;

    const script = `
      window.postMessage(JSON.stringify({
        type: 'command',
        command: '${command}',
        value: ${value ? `'${value}'` : 'null'}
      }), '*');
      true;
    `;

    webViewRef.current.injectJavaScript(script);
  };

  const getFormat = () => {
    if (!webViewRef.current || !editorReady) return;

    const script = `
      window.postMessage(JSON.stringify({
        type: 'getFormat'
      }), '*');
      true;
    `;

    webViewRef.current.injectJavaScript(script);
  };

  const focusEditor = () => {
    if (!webViewRef.current || !editorReady) return;

    webViewRef.current.injectJavaScript(`
      quill.focus();
      true;
    `);
  };

  useEffect(() => {
    if (editorReady) {
      const timer = setTimeout(() => {
        focusEditor();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [editorReady]);

  const fontOptions = [
    { label: 'Arial', value: 'arial' },
    { label: 'Times', value: 'times' },
    { label: 'Courier', value: 'courier' },
    { label: 'Georgia', value: 'georgia' },
    { label: 'Verdana', value: 'verdana' }
  ];

  const sizeOptions = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' }
  ];

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
    { value: '#FFFFFF' }, // White
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

  const handleLinkSubmit = () => {
    if (linkUrl.trim()) {
      // Add protocol if missing
      let finalUrl = linkUrl;
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = 'https://' + finalUrl;
      }
      executeCommand('link', finalUrl);
    } else {
      // Remove link if URL is empty
      executeCommand('link', false);
    }
    setShowLinkInput(false);
    setLinkUrl('');
    focusEditor(); // Focus the editor after adding link
  };

  // Function to get the appropriate list icon based on current list type
  const getListIcon = () => {
    if (formatState.list === 'bullet') {
      return "format-list-bulleted";
    } else if (formatState.list === 'ordered') {
      return "format-list-numbered";
    } else {
      return "format-list-bulleted";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editorContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          style={styles.webview}
          scrollEnabled={true}
          keyboardDisplayRequiresUserAction={false}
        />
      </View>

      {editorReady && (
        <View style={styles.toolbar}>
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
              <View style={styles.dropdown}>
                <ScrollView>
                  {fontOptions.map((font) => (
                    <TouchableOpacity
                      key={font.value}
                      style={[
                        styles.dropdownItem,
                        formatState.font === font.value && styles.activeItem
                      ]}
                      onPress={() => {
                        executeCommand('font', font.value);
                        setSelectedFont(font.value);
                        setShowFontMenu(false);
                        focusEditor();
                      }}
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
              <View style={styles.dropdown}>
                <ScrollView>
                  {sizeOptions.map((size) => (
                    <TouchableOpacity
                      key={size.value}
                      style={[
                        styles.dropdownItem,
                        formatState.size === size.value && styles.activeItem
                      ]}
                      onPress={() => {
                        executeCommand('size', size.value);
                        setSelectedSize(size.value);
                        setShowSizeMenu(false);
                        focusEditor();
                      }}
                    >
                      <Text style={[{
                        fontSize: 14
                      },]}>{size.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
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
              {/* <View style={[styles.selectedColorIndicator, { backgroundColor: formatState.color || '#000000' }]} /> */}
            </TouchableOpacity>

            {showColorMenu && (
              <View style={styles.colorPalette}>
                <ScrollView>
                  <View style={styles.colorGrid}>
                    {colorOptions.map((color) => (
                      <TouchableOpacity
                        key={color.value}
                        style={[
                          styles.colorItem,
                          { backgroundColor: color.value },
                          formatState.color === color.value && styles.selectedColorItem
                        ]}
                        onPress={() => {
                          executeCommand('color', color.value);
                          setSelectedColor(color.value);
                          setShowColorMenu(false);
                          focusEditor();
                        }}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </View>

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

          {/* Toggle List (Bullet/Number) */}
          <TouchableOpacity
            style={[styles.toolButton, formatState.list && styles.activeButton]}
            onPress={() => executeCommand('toggleList')}
          >
            <Icon name={getListIcon()} size={24} color="#444" />
          </TouchableOpacity>

          {/* Link */}
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => {
              setShowLinkInput(!showLinkInput);
              setShowFontMenu(false);
              setShowSizeMenu(false);
              setShowColorMenu(false);
            }}
          >
            <Icon name="link" size={24} color="#444" />
          </TouchableOpacity>
        </View>
      )}

      {/* Link Input Dialog */}
      {showLinkInput && (
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
            value={linkUrl}
            onChangeText={setLinkUrl}
            autoCapitalize="none"
            keyboardType="url"
            autoFocus={true}
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
              onPress={() => {
                setShowLinkInput(false);
                setLinkUrl('');
                focusEditor();
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  editorContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    // backgroundColor: '#f5f5f5',
    borderTopWidth: 0.5,
    borderColor: '#ddd',
    padding: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  toolButton: {
    // padding: 5,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  activeButton: {
    // backgroundColor: '#e6f2ff',
  },
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
    zIndex: 1000,
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
  // New styles for the color palette
  colorPalette: {
    position: 'absolute',
    bottom: 50,
    left: -50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    // padding: 8,
    width: 200,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  colorGrid: {
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
  selectedColorIndicator: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -6,
    width: 12,
    height: 3,
    borderRadius: 2,
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
    paddingHorizontal:10,
    marginLeft: 10,
  },
  linkButtonText: {
    fontSize:14,
    color: 'white',
    // fontWeight: 'bold',
    fontFamily:'Poppins-Medium'
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    color: '#444',
    fontSize:14,
    fontFamily:'Poppins-Medium',
  }
});

export default TextEditor;