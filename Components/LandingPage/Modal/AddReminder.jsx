import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { rMS } from '../../Utils/Responsive';
import Clock from '../../../SvgIcons/Clock';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DatePicker from '../../../SvgIcons/DatePicker';

const AddReminder = ({ setAddReminderModal, addReminderModal }) => {
	return (
		<Modal transparent={true} visible={addReminderModal} animationType='fade'>
			<Pressable style={styles.modalOverlay} onPress={() => setAddReminderModal(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View>
						<Text style={styles.addCollaboratorText}>Set Reminder</Text>
					</View>
					<View style={styles.line}></View>

					<View style={styles.clockSection}>
						<View style={{ marginTop: 3 }}>
							<Clock />
						</View>
						<View style={styles.clockSectionTextContainer}>
							<Text style={styles.clockSectionText1}>An hour from now</Text>
							<Text style={styles.clockSectionText2}>01 : 09 PM</Text>
						</View>
					</View>
					<View style={styles.clockSection}>
						<View style={{ marginTop: 3 }}>
							<Clock />
						</View>
						<View style={styles.clockSectionTextContainer}>
							<Text style={styles.clockSectionText1}>Later Today</Text>
							<Text style={styles.clockSectionText2}>05 : 00 PM</Text>
						</View>
					</View>
					<View style={styles.clockSection}>
						<View style={{ marginTop: 3 }}>
							<Clock />
						</View>
						<View style={styles.clockSectionTextContainer}>
							<Text style={styles.clockSectionText1}>Tomorrow</Text>
							<Text style={styles.clockSectionText2}>Friday 20, 03 : 00 PM</Text>
						</View>
					</View>
					<View style={styles.clockSection}>
						<View style={{ marginTop: 3 }}>
							<Clock />
						</View>
						<View style={styles.clockSectionTextContainer}>
							<Text style={styles.clockSectionText1}>Monday</Text>
							<Text style={styles.clockSectionText2}>Monday 23, 09 : 00 AM</Text>
						</View>
					</View>

					<View style={styles.dateAndLocationContainer}>
						<View style={styles.dateAndLocation}>
							<DatePicker />
							<Text style={styles.dateAndLocationText}>Pick date and time</Text>
						</View>
						<View style={styles.dateAndLocation}>
							<Ionicons name={'location-outline'} size={18} color={'green'} />
							<Text style={styles.dateAndLocationText}>Location</Text>
						</View>
					</View>


					<View style={styles.btnContainer}>
						<TouchableOpacity onPress={() => setAddReminderModal(false)} style={styles.cencelBtn}>
							<Text style={styles.cencelText}>CANCEL</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setAddReminderModal(false)} style={styles.saveBtn}>
							<Text style={styles.saveText}>SAVE</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export default AddReminder;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 25,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	addCollaboratorText: {
		color: '#000',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(21)
	},
	line: {
		width: '100%',
		height: 1.3,
		backgroundColor: '#E9E9E9',
		marginVertical: 10
	},
	clockSection: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 10,
	},
	clockSectionTextContainer: {
		flexDirection: 'column',
	},
	clockSectionText1: {

		color: '#B1B1B1',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12.5),
		fontStyle: 'normal'
	},
	clockSectionText2: {

		color: '#4E4E4E',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(19),
		fontStyle: 'normal'
	},
	dateAndLocation: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center'
	},
	dateAndLocationContainer: {
		flexDirection: 'column',
		gap: 5,
		marginTop: 20,
	},
	dateAndLocationText: {
		color: '#598931',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12.5),
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: rMS(15),
		marginTop: 20,
	},
	cencelBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 12,
		borderColor: '#598931',
		borderWidth: 1.5,
		borderRadius: 10
	},
	cencelText: {
		color: '#598931',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12.5)
	},
	saveBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 14,
		backgroundColor: '#598931',
		borderRadius: 15
	},
	saveText: {
		color: '#FFF',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12.5)
	}

});
