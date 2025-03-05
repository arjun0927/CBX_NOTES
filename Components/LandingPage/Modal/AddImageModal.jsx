import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { rMS } from '../../Utils/Responsive';
import { useGlobalContext } from '../../Context/Context';
import AntDesign from 'react-native-vector-icons/AntDesign'
import NotificationBell from '../../../SvgIcons/NotificationBell';

const AddImageModal = ({ setImageModal, imageModal }) => {
	const { showToast } = useGlobalContext();

	return (
		<Modal transparent={true} visible={imageModal} animationType="fade">
			<Pressable style={styles.modalOverlay} onPress={() => setImageModal(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View style={styles.titleContainer}>
						<Text style={styles.modalTitle}>Notifications</Text>
						<TouchableOpacity onPress={()=>setImageModal(false)}>
							<AntDesign name={'close'} color={'#000'} size={18} />
						</TouchableOpacity>
					</View>
					<View style={styles.line}></View>
					<View style={styles.notificationContainer}>
						<NotificationBell />
						<Text style={styles.notificationContainerText}>
							Akash Verma added you as
							<Text style={styles.collaborator}> Collaborator</Text>
						</Text>
					</View>
					<View style={styles.notificationContainer}>
						<NotificationBell />
						<Text style={styles.notificationContainerText}>
							Akash Verma added you as
							<Text style={styles.collaborator}> Collaborator</Text>
						</Text>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	)
}

export default AddImageModal

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		alignItems: "center",
	},
	modalContainer: {
		width: "90%",
		backgroundColor: "#fff",
		paddingHorizontal: rMS(10),
		borderRadius: rMS(10),
		paddingVertical: rMS(15),
		flexDirection: 'column',
		justifyContent: 'center',
		position: 'absolute',
		top: '8%'
		// gap: 20,
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	modalTitle: {
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(19),
		color: '#464646',
	},
	line: {
		width: '100%',
		height: 1,
		backgroundColor: 'rgba(215, 215, 225, 0.80)',
		marginVertical: 5,
	},
	notificationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
		marginHorizontal: rMS(15),
		marginTop:3,
	},
	notificationContainerText: {
		color: '#464646',
		fontSize: rMS(15.205),
		fontFamily: 'Poppins-Medium'
	},
	collaborator:{
		color: '#598931',
		fontSize: rMS(15.205),
		fontFamily: 'Poppins-SemiBold',
	}
})