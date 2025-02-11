import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import Noteicon from '../../../SvgIcons/Noteicon'
import Staricon from '../../../SvgIcons/Staricon'
import ArchieveIcon from "../../../SvgIcons/Archiveicon";
import Deletedicon from "../../../SvgIcons/Deletedicon";
import Tasksicon from "../../../SvgIcons/Tasksicon";
import Videoicon from "../../../SvgIcons/Videoicon";
import Updatesicon from "../../../SvgIcons/Updatesicon";
import Logouticon from "../../../SvgIcons/Logouticon";

const Menu = ({ setModalVisible }) => {
  return (

    <TouchableOpacity
      activeOpacity={1}
      style={styles.overlay}
      onPress={() => setModalVisible(false)} // Close menu when clicking outside
    >

      <View style={styles.container}>
        <TouchableOpacity >
          <View style={[styles.flex, styles.box, styles.border]}>
            <Noteicon />
            <Text style={styles.text} >Notes</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={[styles.flex, styles.box, styles.border]}>
            <Staricon />
            <Text style={styles.text} >Stared</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={[styles.flex, styles.box, styles.border]}>
            <ArchieveIcon />
            <Text style={styles.text} >Archived</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity >
          <View style={[styles.flex, styles.box, styles.border]}>
            <Deletedicon />
            <Text style={styles.text} >Deleted</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={[styles.flex, styles.box, styles.border]}>
            <Tasksicon />
            <Text style={styles.text} >Tasks</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={[styles.flex, styles.box, styles.border]}>
            <Videoicon />
            <Text style={styles.text} >Instructions</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity >
          <View style={[styles.flex, styles.box, styles.border]}>
            <Updatesicon />
            <Text style={styles.text} >Updates</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.separator} />

        <TouchableOpacity>
          <View style={[styles.flex, styles.box, styles.border]}>
            <Logouticon />
            <Text style={styles.text} >Logout</Text>
          </View>
        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );
};

export default Menu

const styles = StyleSheet.create({

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 9, // Ensure overlay is behind the menu
  },

  container: {
    backgroundColor: "#FFFFFF", // Optional background color
    paddingLeft: 15, // Optional padding
    justifyContent: "space-evenly", // Distributes items evenly
    position: 'absolute',
    left: 0,
    top: 75,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 999, // Ensure the menu is above all elements
    elevation: 5, // For Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    paddingHorizontal: 15,
    width: 200,
    height: 50,
  },

  text: {
    marginLeft: 11, // Gap between icon and text
  },

  separator: {
    height: 1,
    backgroundColor: "#F9F9F9",
    marginVertical: 2,
  },
})