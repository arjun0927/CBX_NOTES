import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import List_view from '../../../SvgIcons/List_view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { rMS, rS, rVS } from '../../Utils/Responsive';

const Empty2 = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.imageWrapper}>
				<Image source={require('../../../assets/images/onboardImg/empty.png')} style={styles.image} />
			</View>
		</SafeAreaView>
	)
}

export default Empty2;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imageWrapper: {
		// justifyContent: 'center',
		// alignItems: 'center',
		// // flex:1,
		// backgroundColor:'red',
		position:'absolute',
		top:'33%',
		left:'21%',
		right:'21%',
		bottom:'30%'
	},
	image: {
		width: 251, 
		height: 151, 
		resizeMode: 'contain', 
	}
})