import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { rMS } from '../../Utils/Responsive';
import { Avatar, Divider } from 'react-native-paper';

const AssignTaskAllEmails = ({ email, setEmail, allEmailModal, setAllEmailModal }) => {

	// console.log('all emails', email)

	const generateInitials = (email) => {
		if (!email) return '?';
		return email.charAt(0).toUpperCase()
	};

	const getColorForEmail = (email) => {
		const hash = Array.from(email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const colors = ['#FFB6C1', '#B0E0E6', '#FFD700', '#98FB98', '#DDA0DD', '#FA8072'];
		return colors[hash % colors.length];
	};

	return (
		<Modal transparent={true} visible={allEmailModal} animationType='fade'>
			<TouchableWithoutFeedback onPress={() => setAllEmailModal(false)}>
				<View style={styles.modalOverlay}>
					<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>

						<View style={styles.addAsignee}>
							<Text style={styles.addAssigneeText}>All Assignees</Text>
						</View>

						<View style={styles.addAsignee}>
							<Divider />
						</View>

						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							<View style={{ maxHeight: 300 }}>
								{email.length === 0 ? (
									<View style={{ alignSelf: 'center' }}>
										<Text style={styles.noAssigneeText}>No Assignees Assigned</Text>
									</View>
								) : (
									email.map((e, index) => (
										<View key={index} style={styles.emailRow}>
											<View style={styles.avatarEmailWrapper}>
												{e.picture !== '' ? (
													<Image style={styles.image} source={{ uri: e.picture }} />
												) : (
													<Avatar.Text
														size={28}
														label={generateInitials(e.email)}
														style={{ backgroundColor: getColorForEmail(e.email) }}
													/>
												)}
												<Text style={styles.emailText}>{e.email}</Text>
											</View>

											<TouchableOpacity onPress={() => {
												const updatedEmails = [...email];
												updatedEmails.splice(index, 1);
												setEmail(updatedEmails);
											}}>
												<AntDesign name={'delete'} color={'#7D7D7D'} size={20} />
											</TouchableOpacity>
										</View>
									))
								)}
							</View>
						</View>


						<TouchableOpacity onPress={() => setAllEmailModal(false)} style={styles.saveBtn}>

							<Text style={styles.saveText}>CLOSE</Text>

						</TouchableOpacity>

					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AssignTaskAllEmails;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		// height: '10%',
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 18,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	addAsignee: {
		marginBottom: 5,
	},
	addAssigneeText: {
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(15),
		color: '#000',
	},
	image: {
		width: 28,
		height: 28,
		borderRadius: 14,
		borderWidth: 2,
		borderColor: "rgb(255, 255, 255)",
	},
	emailRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 6,
		width: '100%',
	},

	noAssigneeText: {
		textAlign: 'center',
		color: '#999',
		fontFamily: 'Poppins-Regular',
		fontSize: rMS(13.5),
		paddingVertical: 10,
	},


	avatarEmailWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		maxWidth: '85%',
		flexShrink: 1,
		gap: 8,
	},

	emailText: {
		flexShrink: 1,
		flexWrap: 'wrap',
		fontSize: rMS(13.5),
		color: '#000',
		fontFamily: 'Poppins-Regular',
	},

	saveBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 3,
		width: '30%',
		borderColor: '#598931',
		borderWidth: 1,
		borderRadius: 10,
		marginTop: 20,
	},
	saveText: {
		color: '#598931',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12.5)
	}


});
