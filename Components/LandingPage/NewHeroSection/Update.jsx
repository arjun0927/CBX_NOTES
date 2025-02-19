import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import List_view from '../../../SvgIcons/List_view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { rMS, rS, rVS } from '../../Utils/Responsive';

const Update = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.navContainer}>
				<Text style={styles.navText}>Update</Text>
				<View style={styles.rightNav}>
					<View style={styles.searchContainer}>
						<AntDesign name={'search1'} color={'#C2C2C2'} size={15} />
					</View>
					<List_view />
				</View>
			</View>

		</SafeAreaView>
	)
}

export default Update;

const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingHorizontal:10,
		paddingVertical:10,
	},
	navContainer:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
	},
	navText:{
		fontSize:rMS(20),
		fontFamily:'Poppins-Medium',
		color:'#000',
	},
	rightNav:{
		flexDirection:'row',
		gap:20,
		alignItems:'center'
	},
	searchContainer:{
		backgroundColor:'#FFF',
		width:rS(30),
		height:rS(30),
		justifyContent:'center',
		alignItems:'center',
		borderRadius:rS(15)
	}
})