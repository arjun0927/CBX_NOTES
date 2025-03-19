import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
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

const { width } = Dimensions.get('window');

const NotesCard = ({ item }) => {
	const { header, apiLink, listView } = useGlobalContext();
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

		try {
			const token = await getItem('token');
			await axios.patch(`${apiLink}/api/updateUserPreference/${item._id}`,
				{ userID: userProfileInfo?._id, preference: updatedPreference },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setStarred(!starred);
		} catch (err) {
			console.log(err);
		}
	};

	const pinning = async () => {
		const preferenceExists = data?.userPreferences?.find(
			(e) => e?.userID == userProfileInfo?._id)
		const isPinned = !preferenceExists?.pinned

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

			return updatedNote;
		});

		const token = await getItem('token');

		await axios.patch(`${apiLink}/api/updateUserPreference/${item._id}`, { userID: userProfileInfo?._id, preference: updatedPreference }, 
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => {
				console.log('Pinned response', res);
				setPinned(!pinned)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// Determine card styles based on listView
	const cardStyle = listView
		? [styles.listCard]
		: styles.card;

	const contentStyle = listView
		? styles.listContent
		: {};

	const gradientStyle = listView
		? [styles.gradient, styles.listGradient]
		: styles.gradient;

	const bottomComponentStyle = listView
		? [styles.bottomComponent, styles.listBottomComponent]
		: styles.bottomComponent;
	return (
		<View style={cardStyle}>
			<View style={styles.mainContentContainer}>
				<View style={[styles.contentWrapper, contentStyle]}>
					<View style={[styles.headerRow, listView && styles.listHeaderRow]}>
						<TouchableOpacity onPress={starring}>
							{starred ? <FilledStar /> : <Star />}
						</TouchableOpacity>
						<TouchableOpacity onPress={pinning}>
							{pinned ? <MaterialIcons name={'push-pin'} size={12} /> : <Pin />}
						</TouchableOpacity>
					</View>
					<View style={styles.separator} />
				</View>

				<TouchableOpacity
					activeOpacity={0.8}
					style={[styles.contentContainer, listView && styles.listContentContainer]}
					onPress={() => navigation.navigate("NoteDetailScreen", { item })}
				>
					<Text style={[styles.title, listView && styles.listTitle]}>{data?.title}</Text>
					<FlatList
						data={data.details}
						keyExtractor={(detail) => detail.key}
						renderItem={({ item: detailItem }) => (
							<View>
								<Text style={[styles.description, listView && styles.listDescription]}>
									{detailItem.value}
								</Text>
							</View>
						)}
					/>
				</TouchableOpacity>
			</View>

			<LinearGradient
				colors={[
					"rgba(207, 205, 205, 0.00)",
					"rgba(182, 180, 180, 0.31)",
					"rgba(149, 147, 147, 0.72)",
					"rgba(116, 115, 115, 0.84)",
					"#4A4A4A",
				]}
				style={gradientStyle}
			/>

			<View style={bottomComponentStyle}>
				<View style={styles.bottomInfo}>
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
	mainContentContainer: {
		flex: 1,
		width: '100%',
		paddingBottom: 40,
	},
	contentWrapper: {
		width: '100%',
	},
	listContent: {
		width: '100%',
	},
	contentContainer: {
		flex: 1,
		width: '100%',
	},
	listContentContainer: {
		flex: 1,
		width: '100%',
	},
	card: {
		backgroundColor: "#fff",
		padding: 10,
		width: width / 2.2,
		height: rVS(197),
		borderRadius: 10,
		overflow: "hidden",
		position: "relative",
	},
	listCard: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 10,
		overflow: "hidden",
		position: "relative",
		width: '100%',
		height: rVS(197),
		flexDirection: 'row',
	},
	headerRow: {
		flexDirection: 'row',
		gap: 6,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
	},
	listHeaderRow: {
		justifyContent: 'flex-end',
		marginBottom: 5,
		width: '100%',
	},
	title: {
		fontSize: 12,
		fontFamily: 'Poppins-SemiBold',
		color: "#464646",
	},
	listTitle: {
		fontSize: 14,
		marginBottom: 5,
	},
	description: {
		fontSize: 9,
		color: "#555",
		marginTop: 5,
		fontFamily: 'Poppins-Medium',
	},
	listDescription: {
		fontSize: 11,
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
	listGradient: {
		// width: '100%',
		height: "30%",
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
	listBottomComponent: {
		width: '100%',
		paddingHorizontal: 15,
	},
	bottomInfo: {
		flex: 1,
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