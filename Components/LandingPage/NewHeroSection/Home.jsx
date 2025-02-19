import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from "react-native-reanimated";
import MainNotesCard from "./MainNotesCard";
import { rMS } from "../../Utils/Responsive";
import Navbar from "./Navbar";
import Add from "./Add";
import BurgerIcon from "../../../SvgIcons/BurgerIcon";
import Menu from "../NewHeroSection/Menu";
import Archived from "./Archived";
import Stared from "./Stared";
import DeletedNotes from "./DeletedNotes";
import Instruction from "./Instruction";
import Update from "./Update";
import Tasks from "./Tasks";

const Home = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("Notes");
  const slideAnim = useSharedValue(-250);
  const fadeAnim = useSharedValue(0);

  const fadeStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }));

  useEffect(() => {
    if (menuVisible) {
      slideAnim.value = withTiming(0, { duration: 300 });
      fadeAnim.value = withTiming(1, { duration: 300 });
    }
  }, [menuVisible]);

  const closeMenu = () => {
    slideAnim.value = withTiming(-250, { duration: 300 });
    fadeAnim.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(setMenuVisible)(false);
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FBF4FF" />
      <View style={styles.container}>
        {menuVisible && (
          <Animated.View style={[styles.overlay, fadeStyle]}>
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={styles.fullScreenTouch} />
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.menuContainer, slideStyle]}>
              <Menu setModalVisible={setMenuVisible} setActiveSection={setActiveSection} activeSection={activeSection} />
            </Animated.View>
          </Animated.View>
        )}

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <BurgerIcon />
          </TouchableOpacity>

          <Navbar />
        </View>
        <View>

          {activeSection === "Notes" && <View style={{ position: 'absolute' }}>
            <MainNotesCard />
          </View>}
          {activeSection === "Deleted" && <DeletedNotes />}
          {activeSection === "Instructions" && <Instruction />}
          {activeSection === "Tasks" && <Tasks />}
          {activeSection === "Updates" && <Update />}
          {activeSection === "archived" && <Archived />}
          {activeSection === "starred" && <Stared />}
        </View>
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
    position: "absolute",
    left: 0,
    top: 0,
    width: "75%",
    height: "100%",
  },
});

export default Home;
