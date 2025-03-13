import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../Context/Context';
import Empty2 from './Empty2';
import MainNotesCard from './MainNotesCard';

const Stared = () => {
	const { getStarredNotesData, starredData } = useGlobalContext();
	const [loading, setLoading] = useState(true);

	const getNoteData = async () => {
		try {
			await getStarredNotesData();
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getNoteData();
	}, [getStarredNotesData]);

	useEffect(() => {
		if (starredData) {
			console.log('starred notes data', starredData);
		}
	}, [starredData]);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{(starredData === undefined  || starredData.length === 0) ? (
					<Empty2 />
				) : (
					<View style={styles.notesContainer}>
							<MainNotesCard allNotesData={starredData} loading={loading} setLoading={setLoading} />
					</View>
				)}
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default Stared;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	notesContainer: {
		flex:1,
	},
});
