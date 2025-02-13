import { StyleSheet, View, TextInput, TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef } from 'react';
import Icon from "react-native-vector-icons/Ionicons";

import BurgerIcon from '../../../SvgIcons/BurgerIcon';
import List_view from '../../../SvgIcons/List_view';
import Bell from '../../../SvgIcons/Bell';
import User_icon from '../../../SvgIcons/User_icon';
import Menu from '../NewHeroSection/Menu';

const Navbar = ({ menuVisible, setMenuVisible }) => {
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMenuVisible(false);
    });
  };

  return (
    <>
      {/* Overlay */}
      {menuVisible && (
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.fullScreenTouch} />
          </TouchableWithoutFeedback>

          <Animated.View style={[styles.menuContainer, { transform: [{ translateX: slideAnim }] }]}>
            <Menu setModalVisible={setMenuVisible} />
          </Animated.View>
        </Animated.View>
      )}

      {/* Navbar */}
      <View style={styles.navContainer}>
        {/* Left Side */}
        <View style={styles.leftNav}>
          <TouchableOpacity onPress={openMenu}>
            <BurgerIcon />
          </TouchableOpacity>

          <View style={styles.search_container}>
            <Icon name="search" size={14} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search Notes"
            />
          </View>
        </View>

        {/* Right Side */}
        <View style={styles.rightNav}>
          <TouchableOpacity><List_view /></TouchableOpacity>
          <TouchableOpacity><Bell /></TouchableOpacity>
          <TouchableOpacity><User_icon /></TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    zIndex: 999,
  },
  fullScreenTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '75%',
    height: '100%',
  },
  navContainer: {
    width: '100%',
    flexDirection: 'row', // Keep elements in one row
    alignItems: 'center', // Align properly
    justifyContent: 'space-between', // Push elements apart
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  leftNav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Prevents search from pushing rightNav
  },
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 17,
    marginLeft: 10,
    flexShrink: 1, // Prevents overflow
    maxWidth: 180, // Ensures it fits
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 12,
    borderRadius: 40,
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
});