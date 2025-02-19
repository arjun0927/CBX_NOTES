import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotesCard from "./NoteCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getItem } from "../../Utils/Storage";
import { getAllNotes } from "../../../apis";

const MainNotesCard = () => {
	const [data , setData] = useState([]);

	const getNoteData = async () => {
		try {
			const token = await getItem('token');
			const response = await getAllNotes(token)
			console.log('Response:', response);
			setData(response);
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
					data={data}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => <NotesCard item={item} />}
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
		paddingHorizontal: 10,
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	rowStyle: {
		justifyContent: "space-between",
		marginBottom: 20,
	},
});
