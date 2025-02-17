import React, { useState } from "react";
import { View, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import Navbar from "./Navbar"
import Add from "./Add"
import MainNotesCard from "./MainNotesCard";
import { rMS } from "../../Utils/Responsive";

const Home = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBF4FF" />
      <View style={styles.container}>
        <Navbar />
        <MainNotesCard />
        <Add />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FBF4FF",
  },
  container: {
    flex: 1,
    paddingHorizontal: rMS(10),
  },
});

export default Home;
