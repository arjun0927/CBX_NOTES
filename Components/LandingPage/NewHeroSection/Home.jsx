import React from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';

import Navbar from '../NewHeroSection/Navbar';
import Empty from '../NewHeroSection/Empty'


const Home = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <Empty />
    </View>
  )

};

export default Home;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FBF4FF',
  },

})
