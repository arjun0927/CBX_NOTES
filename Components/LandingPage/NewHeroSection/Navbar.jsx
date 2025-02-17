import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import BurgerIcon from '../../../SvgIcons/BurgerIcon';
import List_view from '../../../SvgIcons/List_view';
import Bell from '../../../SvgIcons/Bell';
import User_icon from '../../../SvgIcons/User_icon';
import Menu from '../NewHeroSection/Menu';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false)
  const slideAnim = useSharedValue(-250);
  const fadeAnim = useSharedValue(0);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }));

  const openMenu = () => {
    setMenuVisible(true);
    slideAnim.value = withTiming(0, { duration: 300 });
    fadeAnim.value = withTiming(1, { duration: 300 });
  };

  const closeMenu = () => {
    slideAnim.value = withTiming(-250, { duration: 300 });
    fadeAnim.value = withTiming(0, { duration: 300 }, () => {
      // setMenuVisible(false);
      runOnJS(setMenuVisible)(false)
    });
  };

  return (
    <>
      {menuVisible && (
        <Animated.View style={[styles.overlay, fadeStyle]}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.fullScreenTouch} />
          </TouchableWithoutFeedback>

          <Animated.View style={[styles.menuContainer, slideStyle]}>
            <Menu setModalVisible={setMenuVisible} />
          </Animated.View>
        </Animated.View>
      )}

      <View style={styles.navContainer}>
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

        <View style={styles.rightNav}>
          <TouchableOpacity>
            <List_view />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell />
          </TouchableOpacity>
          <TouchableOpacity>
            <User_icon />
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  leftNav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  search_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 17,
    marginLeft: 10,
    flexShrink: 1,
    maxWidth: 180,
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