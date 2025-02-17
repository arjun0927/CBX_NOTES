import { View, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import MainNotesCard from "./MainNotesCard";
import { rMS } from "../../Utils/Responsive";
import React, { useState } from "react";
import Navbar from './Navbar';
import Empty from './Empty';
import BurgerIcon from '../../../SvgIcons/BurgerIcon';

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBF4FF" />
      <Navbar />
      <View style={styles.container}>
        <MainNotesCard />
      </View>
    </SafeAreaView>
    // <View style={styles.container}>
    //   <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
    //   <Empty />
    // </View>
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


{/* <View style={styles.container}>
      <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
      <Empty />
    </View> */}

