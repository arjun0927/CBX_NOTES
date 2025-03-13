import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotesCard from "./NoteCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../Context/Context";
import VerticalShimmerUi from "../../ShimmerUi/VerticalShimmerUi";
import HorizontalShimmerUi from "../../ShimmerUi/HorizontalShimmerUi";

const MainNotesCard = ({ loading, allNotesData }) => {
	const { listView } = useGlobalContext();


	const renderShimmer = () => (
		listView ? (
			<HorizontalShimmerUi loading={loading} />
		) : (
			<VerticalShimmerUi loading={loading} />
		)
	);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{loading ? (
					<FlatList
						key={`loading-${listView ? 'list' : 'grid'}`}
						data={new Array(6).fill(0)}
						keyExtractor={(_, index) => index.toString()}
						renderItem={renderShimmer}
						numColumns={listView ? 1 : 2}
						columnWrapperStyle={!listView ? styles.rowStyle : null}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={listView ? {
							width: '95%', paddingHorizontal: 5,
							paddingVertical: 10,
						} : styles.gridContentContainer}
					/>
				) :
					(
						<FlatList
							key={`loaded-${listView ? 'list' : 'grid'}`}
							data={allNotesData}
							keyExtractor={(item) => item._id}
							renderItem={({ item }) => (
								<View style={listView ? styles.listNoteContainer : styles.noteContainer}>
									<NotesCard item={item} />
								</View>
							)}
							numColumns={listView ? 1 : 2}
							showsVerticalScrollIndicator={false}
							columnWrapperStyle={!listView ? styles.rowStyle : null}
							contentContainerStyle={listView ? styles.listContentContainer : styles.gridContentContainer}
						/>
					)
				}
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

export default MainNotesCard;

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: '100%',
	},
	rowStyle: {
		justifyContent: "space-between",
		marginBottom: 20,
	},
	noteContainer: {
		marginHorizontal: 5,
	},
	listNoteContainer: {
		marginBottom: 15,
		width: '95%',
	},
	listContentContainer: {
		paddingHorizontal: 5,
		paddingVertical: 10,
		alignItems: 'center',
	},
	gridContentContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
});