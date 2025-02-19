import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import BurgerIcon from '../../../SvgIcons/BurgerIcon';
import List_view from '../../../SvgIcons/List_view';
import Bell from '../../../SvgIcons/Bell';
import User_icon from '../../../SvgIcons/User_icon';
// import MenuComponent from './MenuComponent';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <>

      <View style={styles.navContainer}>
        <View style={styles.leftNav}>
          <View style={styles.search_container}>
            <Icon name="search" size={14} color="gray" style={styles.icon} />
            <TextInput style={styles.input} placeholder="Search Notes" />
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
  navContainer: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
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
