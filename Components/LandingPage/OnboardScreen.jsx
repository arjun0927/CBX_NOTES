import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SplaceLogo from '../../SvgIcons/SplaceLogo';
import Footer from './Footer';

const OnboardScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
				<View style={styles.leftNav}>
					<SplaceLogo width={34} height={30} />
					<Text style={styles.cbx}>CBX NOTES</Text>
				</View>
				<TouchableOpacity>
					<View style={styles.rightNav}>
						<Text style={styles.skip}>Skip</Text>
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.footer}>
				<Footer />
			</View>
		</View>
	)
}

export default OnboardScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	navContainer: {
		padding: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	leftNav: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	cbx: {
		color: '#1E1E1E',
		// fontFamily:'Poppins',
		fontSize: 20,
		fontStyle: 'normal',
		fontWeight: '600',
	},
	skip: {
		color: '#598931',
		// fontFamily:'Poppins',
		fontSize: 15,
		fontStyle: 'normal',
		fontWeight: '400',
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
	}
})