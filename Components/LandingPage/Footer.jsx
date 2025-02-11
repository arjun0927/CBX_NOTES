import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CbxLogo from '../../SvgIcons/CbxLogo'

const Footer = () => {
	return (
		<View style={styles.footer}>
			<Text style={styles.text}>Powered By</Text>
			<CbxLogo size={16} />
			<Text style={styles.text2}>CEOITBOX</Text>
		</View>
	)
}

export default Footer;

const styles = StyleSheet.create({
	footer: {
		flex: 1,
		// backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 4,
	},
	text: {
		fontSize: 10,
		color:'#666',
		fontFamily:'Poppins',
		fontWeight:'400',
		fontStyle:'normal'
	},
	text2: {
		fontSize: 10,
		color:'#000',
		fontFamily:'Poppins',
		fontWeight:'500',
		fontStyle:'normal'
	}
})