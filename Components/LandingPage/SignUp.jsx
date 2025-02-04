import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Footer from '../LandingPage/Footer'

const SignUp = () => {
	return (
		<View style={styles.container}>
			<View style={styles.navContainer}>
					<Text style={styles.cbx}>SignUp Screen</Text>
			</View>
			<View style={styles.footer}>
				<Footer />
			</View>
		</View>
	)
}

export default SignUp;

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