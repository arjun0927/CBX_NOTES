<<<<<<< HEAD
import React from "react";
import { View, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import Navbar from "../NewHeroSection/Navbar";
import MainNotesCard from "./MainNotesCard";
import { rMS } from "../../Utils/Responsive";
=======
import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import Navbar from './Navbar';
import Empty from './Empty';
>>>>>>> 392cf6455675ffd8b51477a1e3716a7f9a604015

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBF4FF" />
      <View style={styles.container}>
        <Navbar />
        <MainNotesCard />
      </View>
    </SafeAreaView>
=======
    <View style={styles.container}>
      {/* Wrap everything inside View for proper overlay effect */}
      <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
      <Empty />
    </View>
>>>>>>> 392cf6455675ffd8b51477a1e3716a7f9a604015
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
  safeArea: {
    flex: 1,
    backgroundColor: "#FBF4FF",
  },
=======
>>>>>>> 392cf6455675ffd8b51477a1e3716a7f9a604015
  container: {
    flex: 1,
    paddingHorizontal:rMS(10),
  },
<<<<<<< HEAD
});

export default Home;
=======
});
>>>>>>> 392cf6455675ffd8b51477a1e3716a7f9a604015
