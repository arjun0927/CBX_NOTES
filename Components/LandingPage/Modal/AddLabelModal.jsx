import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View, Keyboard, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Lock from '../../../SvgIcons/Lock';
import LockLabel from '../../../SvgIcons/LockLabel';
import Share from '../../../SvgIcons/Share';
import ColorLabel from '../../../SvgIcons/ColorLabel';
import AddNewLabel from './AddNewLabel';

const AddLabelModal = ({ setAddLabelModalVisible, addLabelModalVisible }) => {
	const [addNewLabelModal, setAddNewLabelModal] = useState(false)
	const labels = ["Management", "Design", "Sanika", "Ishaan", "Shayma", "Accounts", "Development", "Programmer", "HR > Sakshi", "Manager"];

	console.log('from modal screen', addLabelModalVisible);


	return (
		<Modal transparent={true} visible={addLabelModalVisible} animationType='fade'>
			<TouchableWithoutFeedback onPress={() => setAddLabelModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
						<View style={styles.header}>
							<Text style={styles.headerText}>Label</Text>
							<TouchableOpacity style={styles.rightHeader} onPress={() => setAddNewLabelModal(true)}>
								<AntDesign name={'plus'} color={'#598931'} size={12} style={{ marginBottom: 3 }} />
								<Text style={styles.rightHeaderText}>Add new</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.line}></View>

						<FlatList
							data={labels}
							keyExtractor={(item) => item}
							renderItem={({ item }) => (
								<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
									<Text style={styles.itemText}>{item}</Text>
									<View style={{ flexDirection: 'row', gap: 10, marginRight: 20 }}>
										<TouchableOpacity>
											<AntDesign name={'plus'} color={'#5F6368'} size={11} />
										</TouchableOpacity>
										<TouchableOpacity>
											<LockLabel />
										</TouchableOpacity>
										<TouchableOpacity>
											<Share />
										</TouchableOpacity>
										<TouchableOpacity>
											<ColorLabel />
										</TouchableOpacity>
										<TouchableOpacity>
											<AntDesign name={'close'} color={'#5F6368'} size={11} style={{ marginBottom: 3 }} />
										</TouchableOpacity>


									</View>
								</View>
							)}
						/>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>

			<AddNewLabel
				addNewLabelModal={addNewLabelModal}
				setAddNewLabelModal={setAddNewLabelModal}
			/>
		</Modal>

	);
};

export default AddLabelModal;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "90%",
		height: '35%',
		backgroundColor: "#fff",
		paddingHorizontal: 20,
		paddingVertical: 20,
		// paddingBottom: 30,
		borderRadius: 16,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerText: {
		color: '#303030',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(18),
		fontWeight: '600'
	},
	rightHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 7,
	},
	rightHeaderText: {
		color: '#598931',
		fontFamily: 'Poppins-Medium',
		fontSize: 12,
	},
	line: {
		width: '100%',
		height: 1.3,
		backgroundColor: '#E9E9E9',
		marginVertical: 5,
		marginBottom: 15,
	},
	itemText: {
		color: '#303030',
		fontFamily: 'Poppins-Medium',
		fontSize: 16,
	}

});
