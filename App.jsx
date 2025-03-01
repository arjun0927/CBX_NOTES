import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigation from "./GlobalNavigator/Navigation";
import { GlobalProvider } from "./Components/Context/Context";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Import GestureHandlerRootView

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalProvider>
        <Navigation />
      </GlobalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
