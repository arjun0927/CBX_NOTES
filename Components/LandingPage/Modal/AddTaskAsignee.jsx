import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import { useGlobalContext } from '../../Context/Context';
import { getItem } from '../../Utils/Storage';
import { ActivityIndicator } from 'react-native-paper';

const AddTaskAsignee = ({ setAddAsignee, addAsignee }) => {
	const [email, setEmail] = useState('');
	const { assigneeText, setAssigneeText, showToast } = useGlobalContext();
	const [loader, setLoader] = useState(false);

	// console.log(getInitial);

	const addHandler = async () => {
		const trimmedEmail = email.trim().toLowerCase();

		// Check if the email ends with "@gmail.com" OR any ".in" domain
		if (!(trimmedEmail.endsWith('@gmail.com') || trimmedEmail.endsWith('.in'))) {
			setAddAsignee(false);
			showToast({
				type: 'Error',
				message: 'Please enter a valid email'
			});
			return;
		}
		try {
			setLoader(true)
			const token = await getItem('token');
			const { data } = await axios.get(`https://notes.ceoitbox.com/api/photos/${email}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log('email data', data);
			const picture = data;

			const isEmpty = Object.keys(data).length === 0;

			if (isEmpty) {
				setAddAsignee(false);
				setAssigneeText({ email, picture: '' })
				setLoader(false)
			}

			if (JSON.stringify(picture) !== '{}') {
				setAssigneeText({ email, picture });
				setLoader(false);
				setAddAsignee(false)
			}

		} catch (error) {
			console.log(error);
		}
	};


	return (
		<Modal transparent={true} visible={addAsignee} animationType='fade'>
			<TouchableWithoutFeedback onPress={() => setAddAsignee(false)}>
				<View style={styles.modalOverlay}>
					<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>

						<View style={styles.addAsignee}>
							<Text style={styles.addAssigneeText}>Add Assignee</Text>
						</View>

						<View style={styles.textinput}>
							<TextInput keyboardType='email-address' placeholder='' placeholderTextColor={'#D0D0D0'} onChangeText={(text) => setEmail(text)}
								style={{ color: '#000', fontSize: 15, }} />
						</View>
						<View style={styles.btnContainer}>
							<TouchableOpacity onPress={() => setAddAsignee(false)} style={styles.cencelBtn}>
								<Text style={styles.cencelText}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => addHandler()} style={styles.saveBtn}>
								{
									loader ? (
										<ActivityIndicator size={15} color='white' />
									) : (
										<Text style={styles.saveText}>ADD</Text>
									)
								}
							</TouchableOpacity>
						</View>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddTaskAsignee;

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
		marginBottom: 8,
	},
	addAssigneeText: {
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(15),
		color: '#000',
	},
	textinput: {
		borderWidth: 1,
		borderColor: '#9F9F9F',
		borderRadius: 10,
		paddingHorizontal: 8,
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
		paddingVertical: 4,
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
		paddingHorizontal: 12,
		backgroundColor: '#598931',
		borderRadius: 10,
	},
	saveText: {
		color: '#FFF',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12.5)
	}


});
