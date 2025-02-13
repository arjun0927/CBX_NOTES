import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import Navbar from './Navbar';
import Empty from './Empty';

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Wrap everything inside View for proper overlay effect */}
      <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
      <Empty />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF4FF',
  },
});