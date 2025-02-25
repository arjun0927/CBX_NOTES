import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { rS, rVS } from "../../Utils/Responsive";
import DownArrow from "../../../SvgIcons/DownArrow";
import Star from "../../../SvgIcons/Star";
import Pin from "../../../SvgIcons/Pin";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FilledStar from "../../../SvgIcons/FilledStar";
import { useGlobalContext } from "../../Context/Context";
import axios from "axios";
import { getItem } from "../../Utils/Storage";


const NotesCard = ({ item }) => {
	const { header, apiLink } = useGlobalContext();
	const [pinned, setPinned] = useState(false);
	const [userProfileInfo, setUserProfileInfo] = useState(null);
	const [starred, setStarred] = useState(false);
	const [data, setData] = useState(item);

	const navigation = useNavigation();
	const isoDate = item.time;
	const date = new Date(isoDate);
	const formattedDate = date.toLocaleString();

	// Fetch user profile info
	useEffect(() => {
		const fetchUserProfile = async () => {
			const profile = await getItem('userProfileInfo');
			setUserProfileInfo(profile);

			// Update starred state based on fetched userProfileInfo
			if (profile) {
				setStarred(
					item?.userStarred ||
					item?.userPreferences?.find((el) => el?.userID === profile?._id)?.starred || false
				);
				setPinned(
					item?.pinned ||
					item?.userPreferences?.find((el) => el?.userID === profile?._id)?.pinned || false
				)
			}
		};

		fetchUserProfile();
	}, []);

	const starring = async () => {
		if (!userProfileInfo) return;

		const preferenceExists = data?.userPreferences?.find((e) => e?.userID === userProfileInfo?._id);
		const isStarred = !preferenceExists?.starred;
		let updatedPreference;
		let updatedNote;

		setData((prev) => {
			updatedNote = {
				...prev,
				userStarred: isStarred,
				userPreferences: prev?.userPreferences?.map((e) => {
					if (e?.userID === userProfileInfo?._id) {
						updatedPreference = {
							...e,
							starred: isStarred,
							userID: userProfileInfo?._id,
							pinned: e?.pinned || false,
							email: userProfileInfo?.email
						};
						return updatedPreference;
					}
					return e;
				}),
			};

			if (!preferenceExists) {
				updatedPreference = {
					pinned: false,
					userID: userProfileInfo?._id,
					starred: isStarred,
					email: userProfileInfo?.email
				};
				updatedNote.userPreferences.push(updatedPreference);
			}

			return updatedNote;
		});

		// console.log('body', { userID: userProfileInfo?._id, preference: updatedPreference });

		try {
			await axios.patch(`${apiLink}/api/updateUserPreference/${item._id}`,
				{ userID: userProfileInfo?._id, preference: updatedPreference },
				header
			);
			setStarred(!starred);
		} catch (err) {
			console.log(err);
		}
	};

	const pinning = async () => {
		// const isPinned = !data.pinned;
		const preferenceExists = data?.userPreferences?.find(
			(e) => e?.userID == userProfileInfo?._id)
		const isPinned = !preferenceExists?.pinned
		// return
		let updatedNote
		let updatedPreference
		setData((prev) => {
			updatedNote = {
				...prev, userPinned: isPinned, userPreferences: prev?.userPreferences?.map((e) => {
					if (e?.userID == userProfileInfo?._id) {
						updatedPreference = { ...e, pinned: isPinned, userID: userProfileInfo?._id, starred: e?.starred || false, email: userProfileInfo?.email };
						return updatedPreference
					} else {
						return e;
					}
				})
			};
			if (!preferenceExists) {
				updatedPreference = { pinned: isPinned, userID: userProfileInfo?._id, starred: false, email: userProfileInfo?.email };
				updatedNote.userPreferences.push(updatedPreference)
			}

			// setData((prevNotes) => {
			// 	// Filter out the updated note from both arrays
			// 	let pinnedNotes = prevNotes.filter(
			// 		(n) => n.userPinned && n._id !== updatedNote._id
			// 	);
			// 	let unpinnedNotes = prevNotes.filter(
			// 		(n) => !n.userPinned && n._id !== updatedNote._id
			// 	);

			// 	if (isPinned) {
			// 		// If pinning, add to pinned notes
			// 		pinnedNotes = [updatedNote, ...pinnedNotes];
			// 	} else {
			// 		// If unpinning, add to unpinned notes
			// 		unpinnedNotes.push(updatedNote);
			// 		// Sort unpinned notes by time
			// 		unpinnedNotes = unpinnedNotes.sort(
			// 			(a, b) =>
			// 				new Date(b?.lastEdited?.time) - new Date(a?.lastEdited?.time)
			// 		);
			// 	}

			// 	// Combine pinned and sorted unpinned notes
			// 	return [...pinnedNotes, ...unpinnedNotes];
			// });

			return updatedNote;
		});

		await axios.patch(`${apiLink}/api/updateUserPreference/${item._id}`, { userID: userProfileInfo?._id, preference: updatedPreference }, header)
			.then((res) => {
				console.log('Pinned response', res);
				setPinned(!pinned)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<View style={styles.card}>
			<View>
				<View style={{ flexDirection: 'row', gap: 6, justifyContent: 'flex-end', alignItems: 'center' }}>
					<TouchableOpacity onPress={starring}>
						{starred ? <FilledStar /> : <Star />}
					</TouchableOpacity>
					<TouchableOpacity onPress={pinning}>
						{pinned ? <MaterialIcons name={'push-pin'} />
						: <Pin />}
					</TouchableOpacity>
				</View>
				<View style={styles.separator} />
			</View>

			<TouchableOpacity
				activeOpacity={0.8}
				onPress={() => navigation.navigate("NoteDetailScreen", { item })}
			>
				<Text style={styles.title}>{data?.title}</Text>
				<FlatList
					data={data.details}
					keyExtractor={(detail) => detail.key}
					renderItem={({ item: detailItem }) => (
						<View>
							<Text style={styles.description}>{detailItem.value}</Text>
						</View>
					)}
				/>
			</TouchableOpacity>

			<LinearGradient
				colors={[
					"rgba(207, 205, 205, 0.00)",
					"rgba(182, 180, 180, 0.31)",
					"rgba(149, 147, 147, 0.72)",
					"rgba(116, 115, 115, 0.84)",
					"#4A4A4A",
				]}
				style={styles.gradient}
			/>

			<View style={styles.bottomComponent}>
				<View>
					<Text style={styles.bottomText}>Last Edited</Text>
					<Text style={styles.dateText}>{formattedDate}</Text>
					<View style={{ flexDirection: 'row', gap: 10 }}>
						<Text style={styles.bottomText}>You</Text>
						<View style={styles.userIcon}>
							<Text style={styles.userInitial}>K</Text>
						</View>
					</View>
				</View>
				<TouchableOpacity>
					<DownArrow />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 10,
		width: rS(160),
		height: rVS(197),
		borderRadius: 10,
		overflow: "hidden",
		position: "relative",
	},
	title: {
		fontSize: 12,
		fontFamily: 'Poppins-SemiBold',
		color: "#464646",
	},
	description: {
		fontSize: 9,
		color: "#555",
		marginTop: 5,
		fontFamily: 'Poppins-Medium',
	},
	gradient: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: "25%",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	bottomComponent: {
		position: "absolute",
		bottom: 5,
		left: 10,
		right: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: "center",
	},
	bottomText: {
		fontSize: 8,
		color: 'white',
		fontWeight: 'bold',
	},
	dateText: {
		fontSize: 10,
		color: 'white',
		fontWeight: 'bold',
	},
	userIcon: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	userInitial: {
		fontSize: 9,
		color: 'black',
		fontWeight: '500',
	},
	separator: {
		height: 1,
		width: '100%',
		backgroundColor: '#F2F1F1',
		marginVertical: 7,
		alignSelf: 'center',
	},
});

export default NotesCard;
