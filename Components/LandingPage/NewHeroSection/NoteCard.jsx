import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { rS, rVS } from "../../Utils/Responsive";
import DownArrow from "../../../SvgIcons/DownArrow";
import Star from "../../../SvgIcons/Star";
import Pin from "../../../SvgIcons/Pin";
import { useNavigation } from "@react-navigation/native";

const NotesCard = ({ item }) => {
	const navigation = useNavigation();
	const isoDate = item.time;

	const date = new Date(isoDate);

	const formattedDate = date.toLocaleString();
	// console.log(formattedDate); 

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("NoteDetailScreen", { item })}>
			<View style={styles.card}>
				<View style={{}}>
					<View style={{ flexDirection: 'row', gap: 6, justifyContent: 'flex-end' }}>
						<Star />
						<Pin />
					</View>
					<View style={{ height: 1, width: '100%', backgroundColor: '#F2F1F1', marginVertical: 7, alignSelf: 'center' }}>
					</View>
				</View>
				<Text style={styles.title}>{item?.title}</Text>
				<FlatList
					data={item.details}
					keyExtractor={(item) => item.key}
					renderItem={({ item }) => (
						<View>
							<Text style={styles.description}>{item.value}</Text>
						</View>
					)}
				/>


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
						<Text style={{ fontSize: 8, color: 'white', fontWeight: 'bold' }}>Last Edited</Text>
						<Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>{formattedDate}</Text>
						<View style={{ flexDirection: 'row', gap: 10 }}>
							<Text style={{ fontSize: 8, color: 'white', fontWeight: 'bold' }}>You</Text>
							<View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 9, color: 'black', fontWeight: '500' }}>K</Text>
							</View>
						</View>
					</View>
					<TouchableOpacity>
						<DownArrow />
					</TouchableOpacity>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#fff",
		padding: 10,
		width: rS(150),
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
		fontFamily: 'Poppins-Medium'
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

});

export default NotesCard;
