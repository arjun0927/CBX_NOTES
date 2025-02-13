import React, { useState, useRef } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Image } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SplaceLogo from '../../SvgIcons/SplaceLogo';
import Footer from './Footer';
import Svg1 from '../../assets/images/onboardImg/onboardSvgs/Svg1';
import Svg2 from '../../assets/images/onboardImg/onboardSvgs/Svg2';
import Svg3 from '../../assets/images/onboardImg/onboardSvgs/Svg3';
import Svg4 from '../../assets/images/onboardImg/onboardSvgs/Svg4';
import { rS, rVS } from '../Utils/Responsive';

const { width, height } = Dimensions.get('window');

const onboardData = [
	{ id: '1', image: require('../../assets/images/onboardImg/1.png'), text: 'Quick and easy audio notes' },
	{ id: '2', image: require('../../assets/images/onboardImg/2.png'), text: 'Download and restore history easily' },
	{ id: '3', image: require('../../assets/images/onboardImg/3.png'), text: 'Improve readability with formatting, links, and images' },
	{ id: '4', image: require('../../assets/images/onboardImg/4.png'), text: 'Easy Collaborations with Sharable labels' },
];

const OnboardScreen = ({navigation}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef(null);

	const handleSkip = () => {
		if (currentIndex < onboardData.length - 1) {
			flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
			setCurrentIndex(currentIndex + 1);
		} else {
			navigation.navigate('SignUp');
		}
	};

	const handleViewableItemsChanged = useRef(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	}).current;

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container} edges={['left', 'right']}>

				<View style={styles.navContainer}>
					<View style={styles.leftNav}>
						<SplaceLogo width={30} height={26} />
						<Text style={styles.cbx}>CBX NOTES</Text>
					</View>
					<TouchableOpacity onPress={handleSkip}>
						<Text style={styles.skip}>Skip</Text>
					</TouchableOpacity>
				</View>

				<ImageBackground source={require('../../assets/images/onboardImg/background.png')} resizeMode='contain' style={styles.backgroundImage}>
					<View style={styles.iconContainer}>
						<View style={[styles.iconWrapper, currentIndex === 0 && styles.activeIcon]}>
							<Svg1 width={20} height={20} fill={currentIndex === 0 ? 'white' : 'null'} />
						</View>
						<View style={[styles.iconWrapper, currentIndex === 1 && styles.activeIcon]}>
							<Svg2 width={20} height={20} fill={currentIndex === 1 ? 'white' : 'null'} />
						</View>
						<View style={[styles.iconWrapper, currentIndex === 2 && styles.activeIcon]}>
							<Svg3 width={20} height={20} fill={currentIndex === 2 ? 'white' : 'null'} />
						</View>
						<View style={[styles.iconWrapper, currentIndex === 3 && styles.activeIcon]}>
							<Svg4 width={20} height={20} fill={currentIndex === 3 ? 'white' : 'null'} />
						</View>
					</View>

					<FlatList
						ref={flatListRef}
						data={onboardData}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item) => item.id}
						onViewableItemsChanged={handleViewableItemsChanged}
						renderItem={({ item }) => (
							<View style={styles.itemContainer}>
								<Image style={styles.imageStyle} source={item.image} />
								<View style={styles.imgTextContainer}>
									<Text style={styles.imgText}>
										{item.text}
									</Text>
								</View>
							</View>
						)}
						contentContainerStyle={styles.flatListContent}
					/>

					{/* Pagination */}
					<View style={styles.pagination}>
						{onboardData.map((_, index) => (
							<View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
						))}
					</View>

					<TouchableOpacity style={styles.btnContainer} onPress={()=>navigation.navigate('SignUp')}>
						<Text style={styles.btnText}>Get Started</Text>
					</TouchableOpacity>

					{/* Footer */}
					<View style={styles.footer}>
						<Footer />
					</View>
				</ImageBackground>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default OnboardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	backgroundImage: {
		flex: 1,
	},
	flatListContent: {
		alignItems: 'center',
	},
	iconContainer: {
		position: 'absolute',
		left: 20,
		top: '23%',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 15,
		zIndex:10,
	},
	itemContainer: {
		width,
		height,
		// flex:1,
		// justifyContent: 'center',
		alignItems: 'center',
		// marginLeft:30,
		marginTop: '90%',
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
	navContainer: {
		width: '100%',
		paddingHorizontal: 20,
		paddingTop:20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 0,
		backgroundColor: 'white',
		// height: 70,
		zIndex: 1,
	},
	leftNav: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cbx: {
		color: '#1E1E1E',
		fontSize: 18,
		fontFamily:'Poppins-SemiBold',
		marginLeft: 10,
	},
	skip: {
		color: '#598931',
		fontSize: 16,
		// fontWeight: '500',
		fontFamily:'Poppins-Medium',
	},
	imageStyle: {
		width: rS(200),
		height: rVS(270),
		resizeMode: 'cover',
		marginTop: 20,
	},
	imgTextContainer: {
		width: '70%',
		marginTop:30,
		alignSelf:'center',
	},
	imgText: {
		fontSize: 17,
		textAlign: 'center',
		color: '#848484',
		fontStyle: 'normal',
		fontFamily: 'Poppins-Medium'
	},
	pagination: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 170,
		alignSelf: 'center',
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#D3D3D3',
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: '#598931',
		width: 18,
		height: 8,
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
		bottom: 70,
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
