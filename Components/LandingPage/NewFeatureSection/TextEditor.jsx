import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const TextEditor = ({ 
  initialContent = '', 
  onContentChange,
  placeholder = 'Start typing...',
  editorHeight = 300,
  containerStyle = {}
}) => {
  const webviewRef = useRef(null);
  const [editorReady, setEditorReady] = useState(false);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    if (editorReady && initialContent) {
      setEditorContent(initialContent);
    }
  }, [editorReady, initialContent]);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <style>
        html, body {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        
        #container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
        
        #editor-container {
          flex-grow: 1;
          overflow-y: auto;
          padding: 10px;
          box-sizing: border-box;
          padding-bottom: 120px; /* Extra padding for toolbar */
        }
        
        #editor {
          min-height: ${editorHeight - 50}px;
          outline: none;
          font-size: 16px;
        }
        
        .ql-toolbar.ql-snow {
          border-top: 1px solid #ccc;
          border-bottom: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background: white;
          z-index: 10;
          padding: 8px;
        }
        
        .ql-container.ql-snow {
          border: none;
          font-size: 16px;
        }
        
        .ql-editor.ql-blank::before {
          font-style: italic;
          color: #aaa;
        }
        
        /* Make toolbar buttons more touch-friendly */
        .ql-toolbar button {
          width: 30px;
          height: 30px;
        }
        
        /* Custom formats */
        .ql-editor h1 { font-size: 2em; margin-bottom: 0.5em; }
        .ql-editor h2 { font-size: 1.5em; margin-bottom: 0.5em; }
        .ql-editor pre { background-color: #f0f0f0; padding: 5px; border-radius: 3px; }
        .ql-editor blockquote { border-left: 4px solid #ccc; padding-left: 16px; color: #666; }
        .ql-editor ul, .ql-editor ol { padding-left: 20px; }
        .ql-editor a { color: #0366d6; }
        .ql-editor img { max-width: 100%; }
      </style>
      <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
      <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    </head>
    <body>
      <div id="container">
        <div id="editor-container">
          <div id="editor"></div>
        </div>
      </div>
      <script>
        // Configure Quill with all the features
        const toolbarOptions = [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
          ['link', 'image']
        ];
        
        const quill = new Quill('#editor', {
          modules: {
            toolbar: toolbarOptions
          },
          placeholder: '${placeholder}',
          theme: 'snow'
        });
        
        // Add extra space at the bottom to prevent toolbar overlap
        function adjustEditorPadding() {
          const toolbar = document.querySelector('.ql-toolbar');
          const editorContainer = document.getElementById('editor-container');
          if (toolbar && editorContainer) {
            const toolbarHeight = toolbar.offsetHeight;
            editorContainer.style.paddingBottom = (toolbarHeight + 20) + 'px';
          }
        }
        
        // Call adjustment after DOM is fully loaded
        document.addEventListener('DOMContentLoaded', adjustEditorPadding);
        window.addEventListener('load', adjustEditorPadding);
        window.addEventListener('resize', adjustEditorPadding);
        
        // Call it immediately too
        setTimeout(adjustEditorPadding, 500);
        
        // Handle link insertion
        const Link = Quill.import('formats/link');
        class CustomLink extends Link {
          static create(value) {
            const node = super.create(value);
            value = this.sanitize(value);
            node.setAttribute('href', value);
            node.setAttribute('target', '_blank');
            return node;
          }
        }
        Quill.register(CustomLink, true);
        
        // Fixed image handling via placeholder
        const imageHandler = () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'requestImageUpload'
          }));
          
          // Insert placeholder for now
          const range = quill.getSelection() || { index: quill.getLength() };
          quill.insertEmbed(range.index, 'image', 'https://via.placeholder.com/150');
        };
        
        // Override default image handler
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', imageHandler);
        
        // Handle communication with React Native
        window.addEventListener('message', function(event) {
          try {
            const data = JSON.parse(event.data);
            
            if (data.type === 'setContent') {
              quill.root.innerHTML = data.content;
            } else if (data.type === 'getContent') {
              sendContent();
            } else if (data.type === 'insertImage') {
              const range = quill.getSelection() || { index: quill.getLength() };
              quill.insertEmbed(range.index, 'image', data.url);
            } else if (data.type === 'init') {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'editorReady'
              }));
              adjustEditorPadding();
            }
          } catch (e) {
            console.error('Error processing message:', e);
          }
        });
        
        function sendContent() {
          const html = quill.root.innerHTML;
          const text = quill.getText();
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'contentChanged',
            content: html,
            text: text
          }));
        }
        
        // Send content back to React Native
        quill.on('text-change', function() {
          sendContent();
        });
        
        // Force focus to make content visible
        quill.focus();
        
        // Initial setup message
        setTimeout(() => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'editorReady'
          }));
        }, 100);
      </script>
    </body>
    </html>
  `;

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'contentChanged') {
        setContent(data.content);
        if (onContentChange) {
          onContentChange(data.content, data.text);
        }
      } else if (data.type === 'editorReady') {
        setEditorReady(true);
        if (initialContent) {
          setEditorContent(initialContent);
        }
      } else if (data.type === 'requestImageUpload') {
        // Here you would implement image upload functionality
        // For now, we'll just insert a placeholder
        const imageUrl = 'https://via.placeholder.com/300x200';
        insertImage(imageUrl);
      }
    } catch (error) {
      console.error('Error parsing message from webview:', error);
    }
  };

  const setEditorContent = (content) => {
    webviewRef.current?.injectJavaScript(`
      window.postMessage(JSON.stringify({
        type: 'setContent',
        content: ${JSON.stringify(content)}
      }), '*');
      true;
    `);
  };

  const getEditorContent = () => {
    webviewRef.current?.injectJavaScript(`
      window.postMessage(JSON.stringify({
        type: 'getContent'
      }), '*');
      true;
    `);
    return content;
  };

  const insertImage = (url) => {
    webviewRef.current?.injectJavaScript(`
      window.postMessage(JSON.stringify({
        type: 'insertImage',
        url: ${JSON.stringify(url)}
      }), '*');
      true;
    `);
  };

  const initWebView = () => {
    // Need a slight delay to ensure WebView is fully loaded
    setTimeout(() => {
      webviewRef.current?.injectJavaScript(`
        window.postMessage(JSON.stringify({
          type: 'init'
        }), '*');
        true;
      `);
    }, 500);
  };

  return (
    <View style={[styles.container, { height: editorHeight }, containerStyle]}>
      <WebView
        ref={webviewRef}
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={handleMessage}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={initWebView}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        hideKeyboardAccessoryView={Platform.OS === 'ios'}
        keyboardDisplayRequiresUserAction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    // borderWidth: 1,
    // borderColor: '#E8E8E8',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

// Additional methods for the component
TextEditor.getHtml = (ref) => {
  if (!ref.current) return '';
  return ref.current.getEditorContent();
};

// Method to expose internal methods
TextEditor.methods = {
  setContent: (ref, content) => {
    if (ref.current && ref.current.setEditorContent) {
      ref.current.setEditorContent(content);
    }
  },
  getContent: (ref) => {
    if (ref.current && ref.current.getEditorContent) {
      return ref.current.getEditorContent();
    }
    return '';
  },
  insertImage: (ref, url) => {
    if (ref.current && ref.current.insertImage) {
      ref.current.insertImage(url);
    }
  }
};

export default TextEditor;