// 1. Main TextEditor Component
import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { View, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { WebView } from 'react-native-webview';
import EditorToolbar from './EditorToolbar';
import { LinkInputDialog } from './Color';
import { htmlContent } from './utils/EditorHtml';
import { getItem } from '../../Utils/Storage';
import { uid } from "uid";
import NoteBackhandler from './NoteBackhandler';
import { useGlobalContext } from '../../Context/Context';

const TextEditor = ({ toolbarVisible, setToolbarVisible, ref, backgroundColor }) => {
  const [content, setContent] = useState('');
  const [editorReady, setEditorReady] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  const [formatState, setFormatState] = useState({
    bold: false,
    italic: false,
    underline: false,
    strike: false,
    list: null,
    font: 'arial',
    size: '3',
    color: '#000000',
  });
  const { title, setTitle, details, setDetails, createNoteMask } = useGlobalContext();

  const initialHtmlContent = htmlContent(false);

  // backhandler
  NoteBackhandler();


  const toolbarAnimation = useRef(new Animated.Value(toolbarVisible ? 1 : 0)).current;
  const webViewRef = useRef(null);

  useImperativeHandle(ref, () => ({
    toggleToolbar: () => {
      setToolbarVisible(prev => !prev);
    }
  }));


  const parseQuillContent = (data) => {
    if (typeof data !== "string" || data.trim() === "") {
      console.warn("parseQuillContent received invalid data:", data);
      return [];
    }

    const paragraphs = [];
    const listRegex = /<(ul|ol)>(.*?)<\/(ul|ol)>/gs;
    const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gs;

    let matches = [];

    // Find all lists and paragraphs with their indices
    let match;
    while ((match = listRegex.exec(data)) !== null) {
      matches.push({
        type: "list",
        listType: match[1] === "ul" ? "bullet" : "numbered",
        content: match[2],
        index: match.index,
      });
    }

    while ((match = paragraphRegex.exec(data)) !== null) {
      matches.push({
        type: "paragraph",
        content: match[1].trim(),
        index: match.index,
      });
    }

    // Sort matches based on their original index in data
    matches.sort((a, b) => a.index - b.index);

    // Process matches while maintaining order
    matches.forEach((item) => {
      if (item.type === "list") {
        const listItems = item.content.match(/<li>(.*?)<\/li>/gs) || [];
        listItems.forEach((listItem) => {
          paragraphs.push({
            key: uid(25),
            value: listItem.replace(/<\/?li>/g, "").trim(),
            type: "list",
            listType: item.listType,
            nested: null,
            time: new Date().toISOString(),
            editor: profileEmail,
            expanded: true,
            originalIndex: paragraphs.length,
          });
        });
      } else if (item.type === "paragraph") {
        paragraphs.push({
          key: uid(25),
          value: item.content,
          type: determineContentType(item.content),
          nested: null,
          time: new Date().toISOString(),
          editor: profileEmail,
          expanded: true,
          originalIndex: paragraphs.length,
        });
      }
    });
    setDetails(paragraphs);
  };


  const determineContentType = (content) => {
    const types = [];

    if (/<ul>/.test(content)) types.push('bullet-list');
    if (/<ol>/.test(content)) types.push('numbered-list');

    return types.length > 0 ? types.join('|') : 'text';
  };

  useEffect(() => {
    Animated.timing(toolbarAnimation, {
      toValue: toolbarVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: false
    }).start();
  }, [toolbarVisible, toolbarAnimation]);

  const getInfo = () => {
    const info = getItem('userProfileInfo');
    setProfileEmail(info.email);
  }

  useEffect(() => {
    if (editorReady) {
      const timer = setTimeout(() => {
        focusEditor();
        getInfo();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [editorReady]);

  const handleMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);

      // console.log('body data ',data.data.body);

      const body = data?.data?.body;

      const contentData = typeof body === "string" ? body : JSON.stringify(body);

      // console.log('content data', contentData)
      const formattingKeys = ['underline', 'strike', 'italic', 'bold', 'list', 'size', 'color', 'font'];

      if (typeof data?.data?.title === 'string' && data?.data?.title.length > 0) {
        setTitle(data?.data?.title);
      }

      const isValidContent = (content) => {
        if (!content || Object.keys(content).length === 0 || content === '<p><br></p>') {
          return false;
        }

        const contentKeys = Object.keys(content);

        const isOnlyFormatting = contentKeys.every(key => formattingKeys.includes(key));

        return !isOnlyFormatting;

      };
      const bool = isValidContent(body);

      if (bool) {
        parseQuillContent(contentData);
      } else {
        // console.log("Invalid or Empty Content");
      }

      if (data.type === 'ready') {
        // console.log("Editor initialization message received");
        setEditorReady(true);
        getFormat();
      } else if (data.type === 'content') {
        setContent(data.data);
      } else if (data.type === 'format') {
        setFormatState(prevState => ({
          ...prevState,
          ...data.data
        }));
      }
    } catch (e) {
      console.error("Error parsing editor message", e);
    }
  };

  // useEffect(()=>{
  //   console.log('title => ',title)
  // },[title])

  // useEffect(()=>{
  //   console.log('details => ',details)
  // },[details])


  const executeCommand = (command, value = null) => {
    // if (!webViewRef.current || !editorReady) return;

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

  const handleLinkSubmit = () => {
    if (linkUrl.trim()) {
      let finalUrl = linkUrl;
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = 'https://' + finalUrl;
      }
      executeCommand('link', JSON.stringify({
        url: finalUrl,
        text: linkText.trim() || finalUrl
      }));
    } else {
      executeCommand('link', false);
    }
    setShowLinkInput(false);
    setLinkUrl('');
    setLinkText('');
    focusEditor();
  };

  const toolbarHeight = toolbarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56]
  });

  useEffect(() => {
    if (webViewRef.current && editorReady) {
      const script = `
        document.getElementById("editor").style.filter = "${createNoteMask ? 'blur(3px)' : 'none'}";
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [createNoteMask, editorReady]);

  useEffect(() => {
    if (webViewRef.current && editorReady) {
      const script = `
        document.getElementById("editor-container").style.backgroundColor = "${backgroundColor}";
        document.getElementById("title-input").style.backgroundColor = "${backgroundColor}";
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [backgroundColor]);
  


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editorContainer}>
      <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: initialHtmlContent }} // Use static HTML
          onMessage={handleMessage}
          javaScriptEnabled={true}
          style={styles.webview}
          scrollEnabled={true}
          keyboardDisplayRequiresUserAction={false}
        />
      </View>

      {(toolbarVisible) && (
        <EditorToolbar
          toolbarHeight={toolbarHeight}
          toolbarAnimation={toolbarAnimation}
          formatState={formatState}
          executeCommand={executeCommand}
          focusEditor={focusEditor}
          setShowLinkInput={setShowLinkInput}
        />
      )}

      {showLinkInput && (
        <LinkInputDialog
          linkUrl={linkUrl}
          setLinkUrl={setLinkUrl}
          linkText={linkText}
          setLinkText={setLinkText}
          handleLinkSubmit={handleLinkSubmit}
          onCancel={() => {
            setShowLinkInput(false);
            setLinkUrl('');
            setLinkText('');
            focusEditor();
          }}
        />
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
});

export default TextEditor;