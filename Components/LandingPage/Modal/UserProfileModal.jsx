import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker'; // Import Image Picker
import { rMS } from '../../Utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';
import LogoutIcon from '../../../SvgIcons/Logouticon';
import { getItem } from '../../Utils/Storage';
import User_icon from '../../../SvgIcons/User_icon';
import Edit from '../../../SvgIcons/Edit';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../../Context/Context';
import Logout from './Logout';

const UserProfileModal = ({ setUserProfileModal, userProfileModal }) => {
	const [isLogoutModalVisible, setLogoutModalVisible] = useState(false)
	const userInfo = getItem('userProfileInfo');
	const [userImage, setUserImage] = useState(userInfo?.picture || null);
	const { UserLogout, showToast } = useGlobalContext()

	// console.log('userInfo',userInfo)

	const navigation = useNavigation();

	const handleLogoutConfirm = async () => {
		const message = await UserLogout();
		// console.log(message)
		showToast({
			type: 'SUCCESS',
			message: message,
		})
		setUserProfileModal(false);
		navigation.replace('SignUp');
	};

	// Function to open the gallery
	const openImagePicker = () => {
		const options = {
			mediaType: 'photo',
			quality: 1,
		};

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.errorMessage) {
				console.log('Image Picker Error: ', response.errorMessage);
			} else {
				const source = { uri: response.assets[0].uri };
				setUserImage(source.uri); // Update the user image
			}
		});
	};

	return (
		<Modal transparent={true} visible={userProfileModal} animationType="fade">
			<Pressable style={styles.modalOverlay} onPress={() => setUserProfileModal(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View style={styles.titleContainer}>
						<TouchableOpacity onPress={() => setUserProfileModal(false)}>
							<Feather name={'arrow-left'} size={24} color={'#5F6368'} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setLogoutModalVisible(true)}>
							<LogoutIcon />
						</TouchableOpacity>
					</View>
					<View style={styles.imageContainer}>
						{userImage ? (
							<Image source={{ uri: userImage }} style={styles.userImage} />
						) : (
							<User_icon />
						)}
						<TouchableOpacity style={styles.editIconContainer} onPress={openImagePicker}>
							<Edit />
						</TouchableOpacity>
					</View>
					<View style={styles.infoContainer}>
						<Text style={styles.name}>{userInfo?.name}</Text>
						<Text style={styles.email}>{userInfo?.email}</Text>
					</View>
					<TouchableOpacity style={styles.btnContainer}>
						<Text style={styles.btnText}>Edit Profile</Text>
					</TouchableOpacity>
				</Pressable>
			</Pressable>
			<Logout
				isLogoutModalVisible={isLogoutModalVisible}
				setLogoutModalVisible={setLogoutModalVisible}
			/>
		</Modal>
	);
};

export default UserProfileModal;

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
		position: 'absolute',
		top: '8%',
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingRight: 10,
	},
	imageContainer: {
		alignSelf: 'center',
		position: 'relative',
	},
	userImage: {
		width: 78,
		height: 78,
		borderRadius: 39,
	},
	editIconContainer: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		backgroundColor: '#FFF',
		borderRadius: 20,
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	infoContainer: {
		alignSelf: 'center',
		marginVertical: 10,
	},
	name: {
		textAlign: 'center',
		color: '#464646',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(18),
	},
	email: {
		textAlign: 'center',
		color: '#464646',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(12),
	},
	btnContainer: {
		alignSelf: 'center',
		paddingVertical: 6,
		paddingHorizontal: 12,
		backgroundColor: '#598931',
		borderRadius: 5,
	},
	btnText: {
		color: '#FFF',
		fontSize: rMS(10),
		fontFamily: 'Poppins-Medium'
	}
});
