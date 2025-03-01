import { StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../Context/Context';
import NotesCard from './NoteCard';
import Empty2 from './Empty2';

const Stared = () => {
	const { getStarredNotesData, starredData } = useGlobalContext();

	useEffect(() => {
		getStarredNotesData();
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{starredData === undefined ? (
					<Empty2 />
				) : (
					<View style={styles.notesContainer}>
						{starredData.map((item) => (
							<View key={item._id} style={{ marginHorizontal: 2 }}>
								<NotesCard item={item} />
							</View>
						))}
					</View>
				)}
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Stared;

const styles = StyleSheet.create({
	container: {
		flex:1,
	},
	notesContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
});
