import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotesCard from "./NoteCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getItem } from "../../Utils/Storage";
import { useGlobalContext } from "../../Context/Context";

const MainNotesCard = () => {
	const { getAllNotes, allNotesData } = useGlobalContext();

	// console.log('all notes data', allNotesData);

	const getNoteData = async () => {
		try {
			const token = await getItem('token');
			await getAllNotes(token);

		} catch (error) {
			console.error('Error fetching notes:', error);
		}
	};

	useEffect(() => {
		getNoteData();
	}, [])

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={allNotesData}
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
	);
};

export default MainNotesCard;

const styles = StyleSheet.create({
	container: {
		// paddingHorizontal: 10,
		// flex:1,
		width: '100%',
		height: '100%',
		// justifyContent:'space-between',
		// alignItems:'center',
	},
	rowStyle: {
		justifyContent: "space-between",
		marginBottom: 20,
	},
});
