import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SplaceLogo from '../../SvgIcons/SplaceLogo'

const TopNavbar = () => {
	return (
		<View style={styles.navContainer}>
			<View style={styles.leftNav}>
				<SplaceLogo width={30} height={26} />
				<Text style={styles.cbx}>CBX NOTES</Text>
			</View>
			{/* <TouchableOpacity>
				<Text style={styles.skip}>Skip</Text>
			</TouchableOpacity> */}
		</View>
	)
}

export default TopNavbar

const styles = StyleSheet.create({
	navContainer: {
		width: '100%',
		paddingHorizontal: 20,
		flexDirection: 'row',
		paddingTop:20,
		alignItems: 'center',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 0,
		backgroundColor: 'white',
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
		fontFamily:'Poppins-Medium'
	},
})