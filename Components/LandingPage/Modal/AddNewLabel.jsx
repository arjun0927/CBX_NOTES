import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import { TextInput } from 'react-native-gesture-handler';

const AddNewLabel = ({ setAddNewLabelModal, addNewLabelModal }) => {
	const [labelText, setLabelText] = useState('');

	return (
		<Modal transparent={true} visible={addNewLabelModal} animationType='fade'>
			<TouchableWithoutFeedback onPress={() => setAddNewLabelModal(false)}>
				<View style={styles.modalOverlay}>
					<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>

						<View style={styles.textinput}>
							<TextInput placeholder='New Top-level Label' placeholderTextColor={'#D0D0D0'} onChangeText={(text) => setLabelText(text)}
							style={{color:'#000', fontSize:15,}} />
						</View>
						<View style={styles.btnContainer}>
							<TouchableOpacity onPress={() => setAddNewLabelModal(false)} style={styles.cencelBtn}>
								<Text style={styles.cencelText}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setAddNewLabelModal(false)} style={styles.saveBtn}>
								<Text style={styles.saveText}>SAVE</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddNewLabel;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "85%",
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
