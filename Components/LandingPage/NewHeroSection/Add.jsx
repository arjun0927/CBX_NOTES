import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import PlusIcon from '../../../SvgIcons/PlusIcon';
import AddNote from '../../../SvgIcons/AddNote';
import Labelicon from '../../../SvgIcons/Labelicon';

const Add = () => {
  const [expanded, setExpanded] = useState(false);
  const navigation = useNavigation();

  // Animation values
  const scale1 = useSharedValue(0);
  const scale2 = useSharedValue(0);
  const rotate = useSharedValue(0);

  const toggleMenu = () => {
    setExpanded(!expanded);

    // Animate the options and rotate the PlusIcon
    if (!expanded) {
      scale1.value = withTiming(1, { duration: 300 });
      scale2.value = withTiming(1, { duration: 350 });
      rotate.value = withTiming(45, { duration: 300 }); // Rotate Plus icon
    } else {
      scale1.value = withTiming(0, { duration: 300 });
      scale2.value = withTiming(0, { duration: 300 });
      rotate.value = withTiming(0, { duration: 300 }); // Reset rotation
    }
  };

  // Animated styles for options
  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }, { translateY: scale1.value * -70 }],
    opacity: scale1.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }, { translateY: scale2.value * -130 }],
    opacity: scale2.value,
  }));

  // Animated Plus/Close icon
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  // Animated Plus/Close icon transformation
  const animatedOptionList = useAnimatedStyle(() => ({
    height: expanded ? withTiming(150, { duration: 300 }) : withTiming(0, { duration: 300 }),
    opacity: expanded ? withTiming(1) : withTiming(0),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.options, animatedOptionList]}>
        <View style={styles.list_ontainer}>
          {/* Option 1 */}
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.button_circle}><Labelicon /></View>
          </TouchableOpacity>

          {/* Option 2 */}
          <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate('CreateNote')}>
            <View style={styles.button_circle}><AddNote /></View>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.add_plus_btn} onPress={toggleMenu}>
        <View style={styles.add_button}>
          <Animated.View style={iconStyle}>
            <PlusIcon width={'30'} height={'30'} color={"white"} />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Add;

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

  container: {
    position: 'absolute',
    bottom: '3%',
    right: '5%',
    alignItems: 'center',
  },
  list_ontainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    bottom: 70,
    right: 0,
    borderRadius: 36,
    width: 66,
    paddingVertical: 10,
  },

  add_plus_btn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  add_button: {
    backgroundColor: '#598931',
    width: 65,
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 32,
  },

  optionButton: {
    paddingVertical: 5,
    alignItems: 'center',
  },
  button_circle: {
    height: 45,
    width: 45,
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',

  },
});
