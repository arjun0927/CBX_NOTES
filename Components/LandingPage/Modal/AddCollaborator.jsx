import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Plus from '../../../SvgIcons/Plus';
import { rMS } from '../../Utils/Responsive';

const AddCollaborator = ({ setAddCollaboratorsModal, addCollaboratorsModal }) => {
	return (
		<Modal transparent={true} visible={addCollaboratorsModal} animationType='fade'>
			<Pressable style={styles.modalOverlay} onPress={() => setAddCollaboratorsModal(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View>
						<Text style={styles.addCollaboratorText}>Add Collaborator</Text>
					</View>
					<View style={styles.line}></View>
					<View>
						<Text style={styles.inviteText}>Invite by e-mail</Text>
					</View>
					<View style={styles.plusIcon}>
						<Plus />
					</View>
					<View style={styles.btnContainer}>
						<TouchableOpacity onPress={() => setAddCollaboratorsModal(false)} style={styles.cencelBtn}>
							<Text style={styles.cencelText}>CANCEL</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setAddCollaboratorsModal(false)} style={styles.saveBtn}>
							<Text style={styles.saveText}>SAVE</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>

	);
};

export default AddCollaborator;

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
	inviteText: {
		color: '#7D7D7D',
		fontFamily: 'Poppins-Regular',
		fontSize: rMS(12)
	},
	plusIcon: {
		alignSelf: 'flex-end',
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
