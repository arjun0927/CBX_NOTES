import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, Animated, Easing, Dimensions, } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import List_view from '../../../SvgIcons/List_view';
import Bell from '../../../SvgIcons/Bell';
import User_icon from '../../../SvgIcons/User_icon';
import { useGlobalContext } from '../../Context/Context';
import { rMS, rS } from '../../Utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Notification from '../Modal/Notification';
import { getItem, setItem } from '../../Utils/Storage';
import UserProfileModal from '../Modal/UserProfileModal';
import List_View2 from '../../../SvgIcons/List_View2';

const { width } = Dimensions.get('window');

const Navbar = () => {
  const [isNotificationModalVisible, setNotificationModalVisible] = useState(false)
  const [userProfileModal, setUserProfileModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const { listView, setListView , activeSection , updateSearchQuery ,setUpdateSearchQuery  } = useGlobalContext();
  const userInfo = getItem('userProfileInfo');
  const userImage = userInfo?.picture || null;

  const view = getItem('listView');

  // console.log('view: ',view)

  const toggleSearchBar = () => {
    setIsExpanded((prev) => {
      const newExpandedState = !prev;

      Animated.timing(animation, {
        toValue: newExpandedState ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();

      return newExpandedState;
    });
  };
  const animatedInputWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.35],
  });

  const animatedBackgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['white', 'white'],
  });

  const animatedElevation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2],
  });

  const setView = () => {
    
    setItem('listView',!view)
    setListView(!view)
  }

  return (
    <>
      {activeSection === 'Notes' && (
        <View style={styles.navContainer}>
          <View style={styles.leftNav}>
            <View style={styles.search_container}>
              <Icon name="search" size={14} color="gray" style={styles.icon} />
              <TextInput style={styles.input} placeholder="Search Notes" />
            </View>
          </View>

          <View style={styles.rightNav}>
            <TouchableOpacity onPress={() => setView()}>
              {
                listView ? (
                  <List_view />
                ) : (
                  <List_View2 />
                )
              }
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setNotificationModalVisible(!isNotificationModalVisible)}>
              <Bell />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUserProfileModal(true)}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.userImage} />
              ) : (
                <User_icon />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {activeSection === 'starred' && (
        <View style={styles.navContainer}>
          <Text style={styles.navText}>Starred</Text>
          <View style={styles.rightNav}>
            <View style={styles.searchContainer}>
              <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
            </View>
            <TouchableOpacity onPress={() => setListView(!listView)}>
              {
                listView ? (
                  <List_View2 />
                ) : (
                  <List_view />
                )
              }
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Notification
        isNotificationModalVisible={isNotificationModalVisible}
        setNotificationModalVisible={setNotificationModalVisible}
      />
      {
        activeSection === 'archived' && (
          <View style={styles.navContainer}>
            <Text style={styles.navText}>Archived</Text>
            <View style={styles.rightNav}>
              <View style={styles.searchContainer}>
                <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
              </View>
              <TouchableOpacity onPress={() => setListView(!listView)}>
                {
                  listView ? (
                    <List_View2 />
                  ) : (
                    <List_view />
                  )
                }
              </TouchableOpacity>
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
              <TouchableOpacity onPress={() => setListView(!listView)}>
                {
                  listView ? (
                    <List_View2 />
                  ) : (
                    <List_view />
                  )
                }
              </TouchableOpacity>
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
              {/* <View style={styles.searchContainer}>


              </View> */}
              <Animated.View
                style={[
                  styles.mainContainer,
                  {
                    backgroundColor: animatedBackgroundColor,
                    elevation: isExpanded ? 0 : 0,
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.searchIconContainer}
                  onPress={toggleSearchBar}
                >
                  <AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
                </TouchableOpacity>
                <Animated.View
                  style={[styles.animatedInputContainer, { width: animatedInputWidth }]}
                >
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor="#A9A9A9"
                    style={styles.textInput}
                    value={updateSearchQuery}
                    onChangeText={setUpdateSearchQuery}
                    autoFocus={isExpanded} 

                  />

                </Animated.View>
              </Animated.View>
            </View>
          </View>
        )
      }

      {
        <Notification
          isNotificationModalVisible={isNotificationModalVisible}
          setNotificationModalVisible={setNotificationModalVisible}
        />
      }
      {
        <UserProfileModal
          userProfileModal={userProfileModal}
          setUserProfileModal={setUserProfileModal}
        />
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
    paddingTop: rMS(15),
    paddingVertical: 10,
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
  },
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  mainContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    height: '100%',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIconContainer: {
    // width: 35,
    // height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedInputContainer: {
    height: '100%',
    overflow: 'hidden',
  },
});
