import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Plus from '../../../SvgIcons/Plus';
import { rMS, rS } from '../../Utils/Responsive';
import { getItem } from '../../Utils/Storage';
import axios from 'axios';
import { useGlobalContext } from '../../Context/Context';
import { ActivityIndicator } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddCollaborator = ({ setAddCollaboratorsModal, addCollaboratorsModal }) => {
	const [email, setEmail] = useState('');
	const [profileLoader, setProfileLoader] = useState(false);
	const [profileData, setProfileData] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(null);
	const { showToast, addCollaboratorData, setAddCollaboratorData } = useGlobalContext();

	const userInfo = getItem('userProfileInfo');

	const currentTime = new Date(); // current time
	const expirationTime = new Date(currentTime);
	expirationTime.setFullYear(expirationTime.getFullYear() + 5); // add 5 years

	const formattedCurrentTime = currentTime.toISOString();
	const formattedExpirationTime = expirationTime.toISOString();

	// console.log(collaboratorData, 'collaboratorData');

	useEffect(() => {
		console.log('addCollaboratorData', addCollaboratorData);
	}, [addCollaboratorData]);


	const saveCollaborator = async () => {
		const updatedData = profileData.map((item) => {
			return {
				type: item.permission === 'view' ? 'viewer' : 'editor',
				email: item.email,
				expiration: formattedExpirationTime,
				picture: item.picture,
				emailSent: false,
				read: false,
				time: formattedCurrentTime,
				creator: {
					email: userInfo?.email,
					picture: userInfo?.picture,
					name: userInfo?.name,
				},
			};
		});
		setAddCollaboratorData(updatedData);

		setAddCollaboratorsModal(false);
	};
	

	const getProfileData = async () => {
		try {
			// Email validation
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

			// Check if email is empty
			if (!email.trim()) {
				showToast({
					type: 'error',
					message: 'Please enter an email address',
				});
				return;
			}

			// Validate email format
			if (!emailRegex.test(email.trim())) {
				showToast({
					type: 'error',
					message: 'Please enter a valid email address',
				});
				return;
			}

			// Get token from storage
			const token = await getItem('token');
			if (!token) {
				showToast({
					type: 'error',
					message: 'Authentication required',
				});
				return;
			}

			setProfileLoader(true);

			// API call with proper headers and error handling
			const response = await axios.get(`https://notes.ceoitbox.com/api/photos/${email.trim()}`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
			});

			// console.log(response.data, 'response.data');

			if (Object.keys(response.data).length === 0) {
				console.log('No data found');
				return;
			}

			// Update profile data with email and picture
			const newProfileData = {
				email: email.trim(),
				picture: response.data,
				permission: 'edit', 
			};
	

			// Update the state with the new profile data
			setProfileData(prevData => [...prevData, newProfileData]);

			// Clear the email input
			setEmail('');

		} catch (error) {
			console.error('Error fetching profile data:', error);
			showToast({
				type: 'error',
				message: 'Failed to fetch profile data',
			});
		} finally {
			setProfileLoader(false);
		}
	};

	const handlePermissionChange = (index, type) => {
		setProfileData(prevData => {
			const newData = [...prevData];
			newData[index] = {
				...newData[index],
				permission: type
			};
			return newData;
		});
		setExpandedIndex(null);
	};

	const toggleAccordion = (index) => {
		setExpandedIndex(expandedIndex === index ? null : index);
	};

	const removeProfile = (index) => {
		setProfileData(prevData => prevData.filter((_, i) => i !== index));
	};

	return (
		<Modal transparent={true} visible={addCollaboratorsModal} animationType='fade'>
			<Pressable style={styles.modalOverlay} onPress={() => setAddCollaboratorsModal(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View>
						<Text style={styles.addCollaboratorText}>Add Collaborator</Text>
					</View>
					<View style={styles.line}></View>
					<View style={styles.emailContainer}>
						<View style={styles.inputWrapper}>
							<TextInput
								onChangeText={setEmail}
								value={email}
								style={styles.inviteText}
								placeholder='Invite by e-mail'
								placeholderTextColor={'#7D7D7D'}
							/>
							<TouchableOpacity style={styles.plusIcon} onPress={getProfileData}>
								{
									profileLoader ? <ActivityIndicator size="small" color="#598931" /> : <Plus />
								}
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.profileContainer}>
						{profileData.map((item, index) => (
							<View key={index} style={styles.profileItem}>
								<View style={styles.profileInfo}>
									<Image
										source={{ uri: item.picture }}
										style={styles.profileImage}
									/>
									<Text style={styles.emailText} numberOfLines={1}>
										{item.email}
									</Text>
								</View>
								<View style={styles.permissionWrapper}>
									<TouchableOpacity
										style={styles.permissionButton}
										onPress={() => toggleAccordion(index)}
									>
										<Text style={styles.permissionText}>
											{item.permission === 'edit' ? 'Can Edit' : 'Can View'}
										</Text>
										<AntDesign
											name={expandedIndex === index ? 'up' : 'down'}
											size={12}
											color='#000'
										/>
									</TouchableOpacity>
									{expandedIndex === index && (
										<View style={styles.dropdownContainer}>
											<TouchableOpacity
												style={styles.dropdownOption}
												onPress={() => handlePermissionChange(index, 'edit')}
											>
												<Text style={styles.dropdownText}>Can Edit</Text>
											</TouchableOpacity>
											<TouchableOpacity
												style={[styles.dropdownOption, { borderBottomWidth: 0 }]}
												onPress={() => handlePermissionChange(index, 'view')}
											>
												<Text style={styles.dropdownText}>Can View</Text>
											</TouchableOpacity>
										</View>
									)}
								</View>
								<TouchableOpacity
									style={styles.closeBtn}
									onPress={() => removeProfile(index)}
								>
									<AntDesign name='close' size={20} color='#598931' />
								</TouchableOpacity>
							</View>
						))}
					</View>

					<View style={styles.btnContainer}>
						<TouchableOpacity onPress={() => setAddCollaboratorsModal(false)} style={styles.cencelBtn}>
							<Text style={styles.cencelText}>CANCEL</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => saveCollaborator()} style={styles.saveBtn}>
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
	emailContainer: {
		width: '100%',
	},
	inputWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#7D7D7D',
		borderRadius: 10,
	},
	inviteText: {
		flex: 1,
		color: '#7D7D7D',
		fontFamily: 'Poppins-Regular',
		fontSize: rMS(12),
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	plusIcon: {
		padding: 5,
		marginRight: 0,
	},
	profileContainer: {
		width: '100%',
		flexDirection: 'column',
		marginTop: 10,
	},
	profileItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
		position: 'relative',
	},
	profileInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		gap: rMS(10),
	},
	profileImage: {
		width: rMS(30),
		height: rMS(30),
		borderRadius: 100
	},
	emailText: {
		flex: 1,
		fontSize: rMS(12),
		color: '#333',
		fontFamily: 'Poppins-Regular',
	},
	permissionWrapper: {
		marginHorizontal: rMS(10),
	},
	permissionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: rS(6),
		paddingVertical: rS(2),
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#7D7D7D',
		gap: rMS(5),
	},
	permissionText: {
		fontSize: rMS(9),
		color: '#000',
		fontFamily: 'Poppins-Regular',
	},
	dropdownContainer: {
		position: 'absolute',
		top: 22,
		right: 0,
		backgroundColor: '#FFFFFF',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#7D7D7D',
		zIndex: 1,
		elevation: 3,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	dropdownOption: {
		paddingHorizontal: rMS(10),
		paddingVertical: rMS(5),
		borderBottomWidth: 1,
		borderBottomColor: '#E9E9E9',
	},
	dropdownText: {
		fontSize: rMS(10),
		color: '#000',
		fontFamily: 'Poppins-Regular',
	},
	closeBtn: {
		padding: 4,
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
