import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import List_view from '../../../SvgIcons/List_view';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { rMS, rS, rVS } from '../../Utils/Responsive';
import Empty2 from './Empty2';

const Tasks = () => {
	return (
		<SafeAreaView style={styles.container}>
			<Empty2/>
		</SafeAreaView>
	)
}

export default Tasks;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})