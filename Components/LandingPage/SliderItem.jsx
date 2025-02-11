import { Dimensions, Image, StyleSheet, Text } from 'react-native';
import React from 'react';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen');

const SliderItem = ({ item, index, scrollX }) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width], 
            [-width * 0.2, 0, width * 0.2],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9], // Avoid disappearing
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.5, 1, 0.5], // Smooth fade-in/out
        Extrapolation.CLAMP
      ),
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, rnAnimatedStyle]}>  
      <Image style={styles.img} source={item.image} />
      <Text style={styles.text}>{item.text}</Text>
    </Animated.View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.6,
  },
  img: {
    width: width * 0.8,
    height: height * 0.5,
    resizeMode: 'contain',
  },
  text: {
    width: width * 0.7,
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: '#848484',
  },
});
