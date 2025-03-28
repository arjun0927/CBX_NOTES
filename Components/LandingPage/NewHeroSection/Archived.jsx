import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import WebView from 'react-native-webview';

const Archived = () => {
  
  return (
    <GestureHandlerRootView style={styles.container}>
      
      <WebView source={{ uri: 'https://notes.ceoitbox.com/client/view/task/b0e1a9dc88378085b3b78b44' }} style={{ flex: 1 }} />

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default Archived;
