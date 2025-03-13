import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { getToolEditorHtml } from './utils/ToolbarOptions';

const ToolEditor = ({ toolType, onMessage }) => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        html: getToolEditorHtml(toolType),
        baseUrl: `https://example.com?toolType=${toolType}`
      }}
      onMessage={onMessage}
      javaScriptEnabled={true}
      style={styles.webview}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default ToolEditor;