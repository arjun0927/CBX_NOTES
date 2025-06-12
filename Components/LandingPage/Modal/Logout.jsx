import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { rMS } from '../../Utils/Responsive';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../../Context/Context';

const Logout = ({ setLogoutModalVisible, isLogoutModalVisible }) => {
	const { UserLogout, showToast } = useGlobalContext()

	const navigation = useNavigation();

	const handleLogoutConfirm = async () => {
		try {
			const message = await UserLogout();
	
			showToast({
				type: 'SUCCESS',
				message: message || 'Logged out successfully',
			});
	
			setLogoutModalVisible(false);
			navigation.reset({
				index: 0,
				routes: [{ name: 'SignUp' }],
			});
			
		} catch (error) {
			console.error('Logout failed:', error);
			showToast({
				type: 'ERROR',
				message: 'Logout failed. Please try again.',
			});
		}
	};
	

	return (
		<Modal transparent={true} visible={isLogoutModalVisible} animationType="fade">
			<View style={styles.modalOverlay}>
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Are you sure you want to log out?</Text>
					<View style={styles.line}></View>
					<View style={styles.modalButtons}>
						<Pressable onPress={handleLogoutConfirm} style={styles.confirmButton}>
							<Text style={styles.confirmButtonText}>Yes</Text>
						</Pressable>
						<Pressable onPress={() => setLogoutModalVisible(false)} style={styles.cancelButton}>
							<Text style={styles.canceltext}>No</Text>
						</Pressable>

					</View>
				</View>
			</View>
		</Modal>
	)
}

export default Logout

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "75%",
		backgroundColor: "#fff",
		paddingHorizontal: rMS(30),
		borderRadius: rMS(20),
		paddingVertical: rMS(25),
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 20
	},
	modalTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(16),
		textAlign: 'center',
	},
	line: {
		width: '100%',
		height: 1,
		backgroundColor: 'rgba(215, 215, 225, 0.80)',
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: rMS(10)
	},
	cancelButton: {
		paddingHorizontal: rMS(15),
		paddingVertical: rMS(4),
		alignItems: "center",
		backgroundColor: "#6CA851",
		borderRadius: rMS(15),
		display: 'flex',
		justifyContent: 'center',
	},
	canceltext: {
		color: '#FFF',
		fontFamily: 'Poppins-Medium',
		fontSize: 16,
	},
	confirmButtonText: {
		color: '#6CA851',
		fontFamily: 'Poppins-Medium',
		fontSize: 16,
	},
})