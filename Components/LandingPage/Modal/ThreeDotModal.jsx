import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import AddCollaborators from '../../../SvgIcons/AddCollaborators';
import Reminder from '../../../SvgIcons/Reminder';
import Lock from '../../../SvgIcons/Lock';
import Labelicon from '../../../SvgIcons/Labelicon';
import AddLable from './AddLable';
import AddCollaborator from './AddCollaborator'; 
import AddReminder from './AddReminder';
import AddSecurity from './AddSecurity';
import AddLabel from './AddLabel';

const ThreeDotModal = ({ threeDotModalVisible, setThreeDotModalVisible }) => {
	const [addCollaboratorsModal, setAddCollaboratorsModal] = useState(false);
	const [addLabelModal, setAddLabeModal] = useState(false);
	const [addReminderModal, setAddReminderModal] = useState(false);
	const [addSecureModal, setAddSecureModal] = useState(false);

	const handleAddCollaborators = () => {
		setThreeDotModalVisible(false);
		setAddCollaboratorsModal(true); 
	};

	const handleAddReminder = () => {
		setThreeDotModalVisible(false);
		setAddReminderModal(true);
		console.log('add')
	};
	

	const handleSecureNote = () => {
		setThreeDotModalVisible(false);
		setAddSecureModal(true); 
	};

	const handleAddLabel = () => {
		setThreeDotModalVisible(false);
		setAddLabeModal(true); 
	};

	return (
		<View>
			<Modal transparent={true} visible={threeDotModalVisible} animationType="fade">
				<Pressable style={styles.modalOverlay} onPress={() => setThreeDotModalVisible(false)}>
					<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
						<TouchableOpacity onPress={handleAddCollaborators}>
							<View style={styles.iconContainer}>
								<AddCollaborators />
								<Text style={styles.iconContainerText}>Add Collaborator</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={handleAddLabel}>
							<View style={styles.iconContainer}>
								<AddLable />
								<Text style={styles.iconContainerText}>Add Label</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={()=>handleAddReminder()}>
							<View style={styles.iconContainer}>
								<Reminder />
								<Text style={styles.iconContainerText}>Set Reminder</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity  onPress={handleSecureNote}>
							<View style={styles.iconContainer}>
								<Lock />
								<Text style={styles.iconContainerText}>Secure This Note</Text>
							</View>
						</TouchableOpacity>
					</Pressable>
				</Pressable>
			</Modal>

			<AddCollaborator
				addCollaboratorsModal={addCollaboratorsModal}
				setAddCollaboratorsModal={setAddCollaboratorsModal}
			/>
			<AddSecurity
				addSecureModal={addSecureModal}
				setAddSecureModal={setAddSecureModal}
			/>
			<AddReminder 
				addReminderModal={addReminderModal}
				setAddReminderModal={setAddReminderModal}
			/>
			<AddLabel 
				addLabelModal={addLabelModal}
				setAddLabeModal={setAddLabeModal}
			/>

		</View>
	);
};

export default ThreeDotModal;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
	},
	modalContainer: {
		position: 'absolute',
		bottom: 50,
		right: 30,
		width: "50%",
		backgroundColor: "#fff",
		paddingHorizontal: rMS(20),
		borderRadius: rMS(20),
		paddingVertical: rMS(15),
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 10,
	},
	iconContainer: {
		flexDirection: 'row',
		// alignItems: 'center',
		gap: rMS(10),
	},
	iconContainerText: {
		color: '#000',
		fontFamily: 'Poppins-Regular',
		fontWeight: '500',
		fontSize: rMS(13),
	},
});
