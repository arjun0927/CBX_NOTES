import React, { useState } from 'react';
import { StyleSheet, TextInput, Text, View, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import List_view from '../../../SvgIcons/List_view';
import Bell from '../../../SvgIcons/Bell';
import User_icon from '../../../SvgIcons/User_icon';
import { useGlobalContext } from '../../Context/Context';
import { rMS, rS } from '../../Utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign'

const Navbar = () => {

  const { activeSection, setActiveSection } = useGlobalContext();

  return (
    <>
      {
        activeSection === 'Notes' && (
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
        )
      }
      {
        activeSection === 'starred' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Stared</Text>
            <View style={styles.rightNav}>
              <View style={styles.searchContainer}>
                <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
              </View>
              <List_view />
            </View>
          </View>
        )
      }
      {
        activeSection === 'archived' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Archived</Text>
            <View style={styles.rightNav}>
              <View style={styles.searchContainer}>
                <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
              </View>
              <List_view />
            </View>
          </View>
        )
      }
      {
        activeSection === 'Deleted' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Deleted</Text>
            
          </View>
        )
      }
      {
        activeSection === 'Tasks' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Tasks</Text>
            <View style={styles.rightNav}>
              <View style={styles.searchContainer}>
                <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
              </View>
              <List_view />
            </View>
          </View>
        )
      }
      {
        activeSection === 'Instructions' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Instructions</Text>
            
          </View>
        )
      }
      {
        activeSection === 'Updates' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Update</Text>
            <View style={styles.rightNav}>
              <View style={styles.searchContainer}>
                <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
              </View>
            </View>
          </View>
        )
      }

    </>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: rMS(15),
    paddingVertical: 20,
  },
  leftNav: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: rMS(20),
    fontFamily: 'Poppins-Medium',
    color: '#000',
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
  searchContainer: {
    backgroundColor: '#FFF',
    width: rS(30),
    height: rS(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: rS(15)
  }
});
