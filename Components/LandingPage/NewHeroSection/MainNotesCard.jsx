import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotesCard from "./NoteCard";
import { SafeAreaProvider, SafeAreaView, useSafeAreaFrame } from "react-native-safe-area-context";
import { getItem } from "../../Utils/Storage";
import axios from "axios";

const MainNotesCard = () => {
	const [data , setData] = useState([]);

	const getNoteData = async () => {
		try {
			const token = await getItem('token');

			const response = await axios.get(
				'https://notes.ceoitbox.com/api/getNotes/v2?archived=false&trashed=false',
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			// console.log('Response:', response.data);
			setData(response.data);
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
					keyExtractor={(item) => item.id}
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
		marginTop: 80,
	},
	rowStyle: {
		justifyContent: "space-between",
		marginBottom: 20,
	},
});
