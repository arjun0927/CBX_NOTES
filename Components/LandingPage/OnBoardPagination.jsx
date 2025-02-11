import { Dimensions, StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, { Extrapolation, interpolate, interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

const { width } = Dimensions.get('screen');

const OnBoardPagination = ({ data, scrollX }) => {
	return (
		<View style={styles.paginationContainer}>
			{data.map((_, index) => {
				return <PaginationDot key={index} index={index} scrollX={scrollX} />;
			})}
		</View>
	);
};

const PaginationDot = ({ index, scrollX }) => {
	// Animated style
	const animatedDotStyle = useAnimatedStyle(() => {
		const dotWidth = interpolate(
			scrollX.value,
			[(index - 1) * width, index * width, (index + 1) * width],
			[8, 17, 8],
			Extrapolation.CLAMP
		);

		const backgroundColor = interpolateColor(
			scrollX.value,
			[(index - 1) * width, index * width, (index + 1) * width],
			['#D3D3D3', '#598931', '#D3D3D3']
		);

		// Smooth opacity transition
		const opacity = interpolate(
			scrollX.value,
			[(index - 1) * width, index * width, (index + 1) * width],
			[0.5, 1, 0.5], // Inactive dots will have lower opacity
			Extrapolation.CLAMP
		);

		return {
			width: dotWidth,
			backgroundColor,
			opacity, // Apply opacity effect
		};
	});

	return <Animated.View style={[styles.dot, animatedDotStyle]} />;
};

export default OnBoardPagination;

const styles = StyleSheet.create({
	paginationContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	dot: {
		height: 8,
		borderRadius: 4,
		marginHorizontal: 4,
	},
});
