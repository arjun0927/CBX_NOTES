import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rMS } from '../../Utils/Responsive';
import AddCollaborators from '../../../SvgIcons/AddCollaborators';
import Reminder from '../../../SvgIcons/Reminder';
import Lock from '../../../SvgIcons/Lock';
import Labelicon from '../../../SvgIcons/Labelicon';
import AddLable from './AddLable';

const ThreeDotModal = ({ threeDotModalVisible, setThreeDotModalVisible }) => {
	const handleLogoutConfirm = async () => {
		setThreeDotModalVisible(false);
	};

	return (
		<Modal transparent={true} visible={threeDotModalVisible} animationType="fade">
			<Pressable style={styles.modalOverlay} onPress={() => setThreeDotModalVisible(false)}>
				<View style={styles.modalContainer}>
					<TouchableOpacity>
						<View style={styles.iconContainer}>
							<AddCollaborators />
							<Text style={styles.iconContainerText}>Add Collaborator</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity>
						<View style={styles.iconContainer}>
							<AddLable />
							<Text style={styles.iconContainerText}>Add Label</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity>
						<View style={styles.iconContainer}>
							<Reminder />
							<Text style={styles.iconContainerText}>Set Reminder</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity>
						<View style={styles.iconContainer}>
							<Lock />
							<Text style={styles.iconContainerText}>Secure This Note</Text>
						</View>
					</TouchableOpacity>

				</View>
			</Pressable>
		</Modal>
	)
}

export default ThreeDotModal;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		// justifyContent: "center",
		// alignItems: "center",

	},
	modalContainer: {
		position: 'absolute',
		bottom: 50,
		right: 30,
		width: "80%",
		backgroundColor: "#fff",
		paddingHorizontal: rMS(30),
		borderRadius: rMS(20),
		paddingVertical: rMS(25),
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 20
	},
	iconContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: rMS(15),
	},
	iconContainerText: {
		color: '#000',
		fontFamily: 'Poppins-Regular',
		fontWeight: '500',
		fontSize: rMS(19)
	}
})
