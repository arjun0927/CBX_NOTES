import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import NotesCard from "./NoteCard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { getItem } from "../../Utils/Storage";
import { useGlobalContext } from "../../Context/Context";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { rS, rVS } from "../../Utils/Responsive";

const MainNotesCard = () => {
	const { getAllNotes, allNotesData } = useGlobalContext();
	const [loading, setLoading] = useState(true);

	const getNoteData = async () => {
		try {
			const token = await getItem('token');
			await getAllNotes(token);
		} catch (error) {
			console.error('Error fetching notes:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getNoteData();
	}, []);

	const renderShimmer = () => (
		<View style={styles.shimmerCard}>
			<View style={styles.contentContainer}>
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerTitle}
					autoRun={true}
					visible={!loading}
				/>
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerContent}
					autoRun={true}
					visible={!loading}
				/>
				
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerContentSmall}
					autoRun={true}
					visible={!loading}
				/>
			</View>

			<View style={styles.extraBox}>
				<ShimmerPlaceholder
					LinearGradient={LinearGradient}
					style={styles.shimmerFooter}
					autoRun={true}
					visible={!loading}
				/>
			</View>
		</View>
	);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{loading ? (
					<FlatList
						data={new Array(6).fill(0)}
						keyExtractor={(_, index) => index.toString()}
						renderItem={renderShimmer}
						numColumns={2}
						columnWrapperStyle={styles.rowStyle}
						showsVerticalScrollIndicator={false}
					/>
				) : (
					<FlatList
						data={allNotesData}
						keyExtractor={(item) => item._id}
						renderItem={({ item }) => (
							<View style={styles.noteContainer}>
								<NotesCard item={item} />
							</View>
						)}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						columnWrapperStyle={styles.rowStyle}
					/>
				)}
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
	shimmerCard: {
		width: rS(160),
		height: rVS(175),
		borderRadius: 10,
		backgroundColor: "#FFF",
		padding: 10,
		marginHorizontal: 5,
		marginBottom: 0,
		flexDirection: "column",
		justifyContent: "space-between",
	},
	contentContainer: {
		flexDirection: "column",
	},
	extraBox: {
		marginTop: 10,
		width: "100%",
		alignItems: "center",
	},
	shimmerTitle: {
		width: "70%",
		height: 12,
		borderRadius: 4,
		marginBottom: 6,
	},
	shimmerContent: {
		width: "100%",
		height: 30,
		borderRadius: 4,
		marginBottom: 8,
	},
	shimmerFooter: {
		width: "90%",
		height: 20,
		borderRadius: 5,
	},
	shimmerContentSmall: {
		width: "80%",
		height: 18,
		borderRadius: 4,
		marginBottom: 6,
	},
	noteContainer: {
		marginHorizontal: 2,
	},
});
