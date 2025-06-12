import { FlatList, StyleSheet, View, Dimensions, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import NotesCard from "./NoteCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../Context/Context";
import VerticalShimmerUi from "../../ShimmerUi/VerticalShimmerUi";
import HorizontalShimmerUi from "../../ShimmerUi/HorizontalShimmerUi";
import ShimmerCard from './ShimmerCard';
import { rS, rVS } from '../../Utils/Responsive';
import { getItem } from "../../Utils/Storage";

const { width } = Dimensions.get('window');

const MainNotesCard = ({ loading, allNotesData }) => {
	const { paginationPage, listView, setPaginationPage, getAllNotes, totalPaginationPages } = useGlobalContext();

	const handleLoadMore = async () => {
		if (!isLoading && paginationPage <= totalPaginationPages) {
			setIsLoading(true);
			try {
				const token = await getItem('token');
				const nextPage = paginationPage + 1;
				setPaginationPage(nextPage);
				await getAllNotes(token);
			} catch (error) {
				console.error('Error loading more data:', error);
			} finally {
				setIsLoading(false);
			}
		}
	};

	// Create shimmer data array
	const shimmerData = Array.from({ length: 6 }, (_, index) => ({ id: index }));

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					onScroll={async (event) => {
						const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
						const paddingToBottom = 20;
						const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

						if (isCloseToBottom && !isLoading && paginationPage <= totalPaginationPages) {
							setIsLoading(true);
							try {
								const token = await getItem('token');
								const nextPage = paginationPage + 1;
								setPaginationPage(nextPage);
								await getAllNotes(token);
							} catch (error) {
								console.error('Error loading more data:', error);
							} finally {
								setIsLoading(false);
							}
						}
					}}
					scrollEventThrottle={16}
				>
					<View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: rS(10) }}>
						{loading ? (
							shimmerData.map((item, index) => {
								return (
									<View
										key={index}
										style={[
											{
												marginBottom: '2%',
											},
											listView ? { width: '100%' } : { width: '49%' },
										]}
									>
										<ShimmerCard listView={listView} />
									</View>
								);
							})
						) : (
							<>
								{allNotesData.map((item, index) => (
									<View
										key={index}
										style={[
											{
												marginBottom: '2%',
											},
											listView ? { width: '100%' } : { width: '49%' },
										]}
									>
										<NotesCard item={item} />
									</View>
								))}
								{loading && shimmerData.map((item, index) => (
									<View
										key={`loading-${index}`}
										style={[
											{
												marginBottom: '2%',
											},
											listView ? { width: '100%' } : { width: '49%' },
										]}
									>
										<ShimmerCard listView={listView} />
									</View>
								))}
							</>
						)}
					</View>
				</ScrollView>
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
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	noteContainer: {
		marginHorizontal: 5,
		flex: 1,
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
		// paddingHorizontal: 10,
		paddingVertical: 10,
	},
	gridShimmerContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingBottom: 10,
		width: '100%',
	},
	listShimmerContainer: {
		paddingHorizontal: 10,
		paddingBottom: 10,
		width: '100%',
	},
	shimmerItem: {
		flex: 1,
		marginHorizontal: 5,
		marginBottom: 10,
	},
	listShimmerItem: {
		width: '100%',
		marginBottom: 10,
	},
});