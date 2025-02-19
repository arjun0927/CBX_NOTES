import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";

import Noteicon from "../../../SvgIcons/Noteicon";
import Staricon from "../../../SvgIcons/Staricon";
import ArchieveIcon from "../../../SvgIcons/Archiveicon";
import Deletedicon from "../../../SvgIcons/Deletedicon";
import Tasksicon from "../../../SvgIcons/Tasksicon";
import Videoicon from "../../../SvgIcons/Videoicon";
import Updatesicon from "../../../SvgIcons/Updatesicon";
import Logouticon from "../../../SvgIcons/Logouticon";
import CBXNOTES from "../../../SvgIcons/CBXNOTES"
import Labelicon from "../../../SvgIcons/Labelicon"

const screenWidth = Dimensions.get("window").width;

const Menu = ({ setModalVisible, setActiveSection, activeSection  }) => {
  const translateX = useSharedValue(-screenWidth * 0.7); // Start off-screen
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withSpring(0, { damping: 10, stiffness: 35 });
    opacity.value = withTiming(0.6, { duration: 300 });
  }, []);

  // Close menu function
  const closeMenu = () => {
    translateX.value = withSpring(-screenWidth * 0.7, {
      damping: 10,
      stiffness: 150,
    });
    opacity.value = withTiming(0, { duration: 200 });
    setTimeout(() => setModalVisible(false), 300);
  };

  // Animations
  const animatedMenu = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleSectionClick = (section) => {
    setActiveSection(section);
    // setModalVisible(false);
  };

  return (
    <View style={styles.fullScreen}>

      <Animated.View style={[styles.container, animatedMenu]}>

        <TouchableOpacity>
          <View style={[styles.flex, styles.cbx_box]}>
            <CBXNOTES />
            <Text style={styles.cbx}>CBX NOTES</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSectionClick("Notes")} style={[styles.flex, styles.box, activeSection === "Notes" && styles.activeItem]}>
            <Noteicon />
            <Text style={styles.text}>Notes</Text>
        </TouchableOpacity>
        <View style={styles.first_separator} />

        <TouchableOpacity onPress={() => handleSectionClick("Labels")} style={[styles.flex, styles.box, activeSection === "Labels" && styles.activeItem]}>
            <Labelicon />
            <Text style={styles.text}>Labels</Text>
        </TouchableOpacity>
        <View style={styles.first_separator} />

        <TouchableOpacity onPress={() => handleSectionClick("starred")} style={[styles.flex, styles.box, activeSection === "starred" && styles.activeItem]}>
          <Staricon />
          <Text style={styles.text}>Starred</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSectionClick("archived")} style={[styles.flex, styles.box, activeSection === "archived" && styles.activeItem]}>
          <ArchieveIcon />
          <Text style={styles.text}>Archived</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSectionClick("Deleted")} style={[styles.flex, styles.box, activeSection === "Deleted" && styles.activeItem]}>
            <Deletedicon />
            <Text style={styles.text}>Deleted</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity onPress={() => handleSectionClick("Tasks")} style={[styles.flex, styles.box, activeSection === "Tasks" && styles.activeItem]}>
            <Tasksicon />
            <Text style={styles.text}>Tasks</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity onPress={() => handleSectionClick("Instructions")} style={[styles.flex, styles.box, activeSection === "Instructions" && styles.activeItem]}>
            <Videoicon />
            <Text style={styles.text}>Instructions</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity onPress={() => handleSectionClick("Updates")} style={[styles.flex, styles.box, activeSection === "Updates" && styles.activeItem]}>
            <Updatesicon />
            <Text style={styles.text}>Updates</Text>
        </TouchableOpacity>
        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={[styles.flex, styles.box]}>
            <Logouticon />
            <Text style={styles.text}>Logout</Text>
          </View>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
};

// Component for Menu Items
const MenuItem = ({ Icon, label }) => (
  <>
    <TouchableOpacity>
      <View style={[styles.flex, styles.box]}>
        <Icon />
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
    <View style={styles.separator} />
  </>
);

export default Menu;

const styles = StyleSheet.create({
  fullScreen: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 9,
  },

  container: {
    backgroundColor: "#FFFFFF",
    paddingLeft: 15,
    position: "absolute",
    left: 0,
    top: 0,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 999,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    width: "100%",
    height: '100%',
  },
  activeItem: {
    backgroundColor: "#E5F6D6",
    borderRadius: 8,
  },

  cbx_box: {
    paddingLeft: 20,
    paddingVertical: 30,
  },
  cbx: {
    color: '#1E1E1E',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginLeft: 10,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },

  box: {
    paddingHorizontal: 15,
    width: '90%',
    height: 50,
  },

  text: {
    marginLeft: 11,
  },

  first_separator: {
    height: 1,
    width: '90%',
    marginVertical: 2,
    backgroundColor: '#F4F6F8',
  },
  separator: {
    height: 1,
    width: '90%',
    marginVertical: 2,
  },
});