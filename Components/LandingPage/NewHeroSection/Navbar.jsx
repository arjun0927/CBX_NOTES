import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons"; // Optional Icon'

import BurgerIcon from '../../../SvgIcons/BurgerIcon'
import List_view from '../../../SvgIcons/List_view'
import Bell from '../../../SvgIcons/Bell'
import User_icon from '../../../SvgIcons/User_icon'
import Menu from '../NewHeroSection/Menu'

const Navbar = () => {

  const [query, setQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    if (onSearch) onSearch(text);
  };

  const closeMenu = () => {
    if (modalVisible) setModalVisible(false);
  };

  return (

    <TouchableWithoutFeedback onPress={closeMenu}>
      <View style={styles.navContainer}>
        <View style={styles.leftNav}>

          <TouchableOpacity onPress={() => setModalVisible(true)} >
            <BurgerIcon />
          </TouchableOpacity>


          <View style={styles.search_container}>
            <Icon name="search" size={14} color="gray" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Search Notes"
              value={query}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        <View style={styles.rightNav} >
          <TouchableOpacity onPress={() => showList()} >
            <List_view />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => showNotification()} >
            <Bell />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => ShowUser()} >
            <User_icon />
          </TouchableOpacity>
        </View>

        {modalVisible && <Menu setModalVisible={setModalVisible} style={styles.menu_icon} />}

      </View>
    </TouchableWithoutFeedback>
  )
}

export default Navbar

const styles = StyleSheet.create({

  menu_icon: {


  },

  navContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
  },
  leftNav: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  burger_menu: {
    color: '#464646',
    fontSize: 35,
  },

  search_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 17,
    margin: 10,
    width: '100%',
    maxWidth: 124,
    color: '#C2C2C2',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 10,
    borderRadius: 40,
  },


  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

})