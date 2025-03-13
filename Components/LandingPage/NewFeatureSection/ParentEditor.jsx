import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { parentEditorHtml } from './utils/ToolbarOptions';

const ParentEditor = forwardRef((props, ref) => {
  return (
    <WebView
      ref={ref}
      originWhitelist={['*']}
      source={{ html: parentEditorHtml }}
      onMessage={props.onMessage}
      javaScriptEnabled={true}
      style={styles.webview}
      scrollEnabled={true}
      keyboardDisplayRequiresUserAction={false}
    />
  );
});

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default ParentEditor;