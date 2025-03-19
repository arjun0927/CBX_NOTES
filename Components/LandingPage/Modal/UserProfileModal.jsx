import { Image, Modal, Pressable, TextInput, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker'; // Import Image Picker
import { rMS } from '../../Utils/Responsive';
import Feather from 'react-native-vector-icons/Feather';
import LogoutIcon from '../../../SvgIcons/Logouticon';
import { getItem, setItem } from '../../Utils/Storage';
import User_icon from '../../../SvgIcons/User_icon';
import Edit from '../../../SvgIcons/Edit';
import { useNavigation } from '@react-navigation/native';
import { useGlobalContext } from '../../Context/Context';
import Logout from './Logout';
import axios from 'axios';

const UserProfileModal = ({ setUserProfileModal, userProfileModal }) => {
	const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
	const [userInfo, setUserInfo] = useState(null); // State to store user info
	const [userImage, setUserImage] = useState(null);
	const [name, setName] = useState('');
	const [visibleNameField, setVisibleNameField] = useState(false);
	const { UserLogout, showToast } = useGlobalContext();

	// Fetch user info on modal open
	useEffect(() => {
		const fetchUserInfo = async () => {
			const storedUserInfo = await getItem('userProfileInfo');
			setUserInfo(storedUserInfo);
			setUserImage(storedUserInfo?.picture || null);
			setName(storedUserInfo?.name || '');
		};
		fetchUserInfo();
	}, [userProfileModal]); 

	const editName = async () => {
		try {
			const _id = userInfo._id;
			const token = await getItem('token'); 
	
			const response = await axios.put(
				`https://notes.ceoitbox.com/api/users/${_id}`,
				{ name: name },
				{
					headers: {
						Authorization: `Bearer ${token}`, 
					},
				}
			);
			await setItem('userProfileInfo', response.data);
			setUserInfo(response.data); // Update state
			setVisibleNameField(false); // Hide input field
		} catch (error) {
			console.error('Error updating name:', error.response?.data || error.message);
		}
	};

	function closeModal(){
		setUserProfileModal(false);
		setVisibleNameField(false);
	}


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
				setUserImage(source.uri);
			}
		});
	};

	return (
		<Modal transparent={true} visible={userProfileModal} animationType="fade">
			<Pressable style={styles.modalOverlay} onPress={() => closeModal()}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View style={styles.titleContainer}>
						<TouchableOpacity onPress={() => closeModal()}>
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
					{visibleNameField ? (
						<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10, }}>
							<TextInput
								placeholder='Enter Name'
								value={name}
								onChangeText={setName}
								style={{
									height: 35,
									width: '70%',
									backgroundColor: 'rgb(236, 227, 241)',
									borderRadius: 6,
									paddingHorizontal: 10,
									// fontSize:rMS(12)
								}}
							/>
							<TouchableOpacity
								style={{
									backgroundColor: 'rgb(152, 127, 168)',
									height: 35,
									paddingHorizontal: 12,
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5
								}}
								onPress={() => {
									editName();
									setVisibleNameField(false); 
								}}
							>
								<Text style={{ color: '#FFF', fontSize: rMS(14), fontFamily: 'Poppins-Medium' }}>
									Save
								</Text>
							</TouchableOpacity>

						</View>
					) : (
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={() => setVisibleNameField(true)}
						>
							<Text style={styles.btnText}>Edit Profile</Text>
						</TouchableOpacity>
					)}

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
