import { StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import SliderItem from './SliderItem';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import OnBoardPagination from './OnBoardPagination';
import SplaceLogo from '../../SvgIcons/SplaceLogo';
import Footer from './Footer';
import Svg1 from '../../assets/images/onboardImg/onboardSvgs/Svg1';
import Svg2 from '../../assets/images/onboardImg/onboardSvgs/Svg2';
import Svg3 from '../../assets/images/onboardImg/onboardSvgs/Svg3';
import Svg4 from '../../assets/images/onboardImg/onboardSvgs/Svg4';

const { width } = Dimensions.get('screen');

const Onboard = ({ navigation }) => {
	const [paginationIndex, setPaginationIndex] = useState(0);
	const flatListRef = useRef(null);

	const onboardData = [
		{ id: '1', image: require('../../assets/images/onboardImg/1.png'), text: 'Quick and easy audio notes' },
		{ id: '2', image: require('../../assets/images/onboardImg/2.png'), text: 'Download and restore history easily' },
		{ id: '3', image: require('../../assets/images/onboardImg/3.png'), text: 'Improve readability with formatting, links, and images' },
		{ id: '4', image: require('../../assets/images/onboardImg/4.png'), text: 'Easy Collaborations with Sharable labels' },
	];

	const scrollX = useSharedValue(0);
	const onScrollHandler = useAnimatedScrollHandler({
		onScroll: (e) => {
			scrollX.value = e.contentOffset.x;
		},
	});

	// Viewability Config
	const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

	const onViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setPaginationIndex(viewableItems[0].index);
		}
	}).current;

	const viewabilityConfigCallbackPairs = useRef([{ viewabilityConfig, onViewableItemsChanged }]);

	// Slide Scroll Function
	const scrollToSlide = (index) => {
		setPaginationIndex(index);
		flatListRef.current?.scrollToIndex({ index, animated: true });
	};

	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
				<View style={styles.leftNav}>
					<SplaceLogo width={30} height={26} />
					<Text style={styles.cbx}>CBX NOTES</Text>
				</View>
				<TouchableOpacity onPress={()=> navigation.navigate('SignUp')}>
					<Text style={styles.skip}>Skip</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.backgroundWrapper}>
				<ImageBackground source={require('../../assets/images/onboardImg/background.png')} resizeMode='contain' style={styles.backgroundImage}>
					<View style={{ marginTop: 30 }}>
						<View style={styles.iconContainer}>
							<TouchableOpacity onPress={() => scrollToSlide(0)}>
								<View style={[styles.iconWrapper, paginationIndex === 0 && styles.activeIcon]}>
									<Svg1 width={20} height={20} fill={paginationIndex === 0 ? 'white' : 'null'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => scrollToSlide(1)}>
								<View style={[styles.iconWrapper, paginationIndex === 1 && styles.activeIcon]}>
									<Svg2 width={20} height={20} fill={paginationIndex === 1 ? 'white' : 'null'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => scrollToSlide(2)}>
								<View style={[styles.iconWrapper, paginationIndex === 2 && styles.activeIcon]}>
									<Svg3 width={20} height={20} fill={paginationIndex === 2 ? 'white' : 'null'} />
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => scrollToSlide(3)}>
								<View style={[styles.iconWrapper, paginationIndex === 3 && styles.activeIcon]}>
									<Svg4 width={20} height={20} fill={paginationIndex === 3 ? 'white' : 'null'} />
								</View>
							</TouchableOpacity>
						</View>

						<Animated.FlatList
							ref={flatListRef}
							data={onboardData}
							renderItem={({ item, index }) => <SliderItem item={item} index={index} scrollX={scrollX} />}
							horizontal
							showsHorizontalScrollIndicator={false}
							pagingEnabled
							onScroll={onScrollHandler}
							snapToAlignment="center"
							snapToInterval={width}
							decelerationRate="fast"
							viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
							keyExtractor={(item) => item.id}
						/>
					</View>
					<View style={styles.paginationWrapper}>
						<OnBoardPagination data={onboardData} scrollX={scrollX} paginationIndex={paginationIndex} />
					</View>
				</ImageBackground>

				<TouchableOpacity style={styles.btnContainer} onPress={() => navigation.navigate('SignUp')}>
					<Text style={styles.btnText}>Get Started</Text>
				</TouchableOpacity>

				<View style={styles.footer}>
					<Footer />
				</View>
			</View>
		</View>
	);
};

export default Onboard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF'
	},
	navContainer: {
		width: '100%',
		paddingHorizontal: 20,
		paddingTop: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 0,
		backgroundColor: 'white',
		zIndex: 1,
	},
	leftNav: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cbx: {
		color: '#1E1E1E',
		fontSize: 18,
		fontFamily: 'Poppins-SemiBold',
		marginLeft: 10,
	},
	skip: {
		color: '#598931',
		fontSize: 16,
		fontFamily: 'Poppins-Medium',
	},
	backgroundImage: {
		flex: 1,
	},
	iconContainer: {
		position: 'absolute',
		left: 20,
		top: '26%',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 15,
		zIndex: 10,
	},
	iconWrapper: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#E9FFD7',
		justifyContent: 'center',
		alignItems: 'center',
	},
	activeIcon: {
		backgroundColor: '#598931',
	},
	paginationWrapper: {
		position: 'absolute',
		bottom: 250,
		alignSelf: 'center'
	},
	btnContainer: {
		width: '80%',
		padding: 10,
		backgroundColor: '#598931',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		borderRadius: 10,
		position: 'absolute',
		bottom: 120,
	},
	btnText: {
		color: '#FFF',
		fontFamily: 'Poppins-Medium',
		fontWeight: '600',
		fontSize: 18,
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
	},
});
