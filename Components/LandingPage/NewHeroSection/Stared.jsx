import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { rMS, rS, rVS } from '../../Utils/Responsive';
import { useGlobalContext } from '../../Context/Context';
import MainNotesCard from './MainNotesCard';
import NotesCard from './NoteCard';

const Stared = () => {
	const { getStarredNotesData , starredData } = useGlobalContext();

	const getStarredData = async () => {
		await getStarredNotesData();
	}
	useEffect(() => {
		getStarredData();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={starredData}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) =>
						<View style={{ marginHorizontal: 2, }}>
							<NotesCard item={item} />
						</View>}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					columnWrapperStyle={styles.rowStyle}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export default Stared;

const styles = StyleSheet.create({
	container: {
		// paddingHorizontal: 10,
		// flex:1,
		width: '100%',
		height: '100%',
	},
	rowStyle: {
		justifyContent: "space-between",
		marginBottom: 20,
	},
})