import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const labels = ["Management", "Design > Kalyani", "Design > Sanika", "Development > Ishaan", "Development > Sunil", "Development > Shayma", "Accounts", "Development", "Programmer", "HR > Sakshi", "Manager"];

const AddLabel = ({ setAddLabeModal, addLabelModal }) => {
	const [selectedLabels, setSelectedLabels] = useState([]);

	const toggleLabel = (label) => {
		setSelectedLabels((prev) =>
			prev.includes(label)
				? prev.filter((item) => item !== label)
				: [...prev, label]
		);
	};

	return (
		<Modal transparent={true} visible={addLabelModal} animationType='fade'>
			<Pressable style={styles.modalOverlay} onPress={() => setAddLabeModal(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View>
						<Text style={styles.addCollaboratorText}>Add Label</Text>
					</View>
					<View style={styles.line}></View>

					{/* FlatList for Labels */}
					<FlatList
						data={labels}
						keyExtractor={(item) => item}
						renderItem={({ item }) => (
							<View >
								<TouchableOpacity
									activeOpacity={0.7}
									style={styles.labelContainer}
									onPress={() => toggleLabel(item)}
								>
									<Ionicons
										name={selectedLabels.includes(item) ? "checkbox" : "square-outline"}
										size={22}
										color="#656565"
									/>
									<Text style={styles.labelText}>{item}</Text>
								</TouchableOpacity>

							</View>
						)}
					/>

					<View style={styles.btnContainer}>
						<View>
							<TouchableOpacity style={[styles.cancelBtn, { flexDirection: 'row', gap: 4, alignItems:'center', }]}>
								<AntDesign name={'plus'} size={15} color={'#598931'} />
								<Text style={styles.cancelText}>New Label</Text>
							</TouchableOpacity>
						</View>
						<View style={{ flexDirection: 'row', gap: 10, }}>
							<TouchableOpacity onPress={() => setAddLabeModal(false)} style={styles.cancelBtn}>
								<Text style={styles.cancelText}>CANCEL</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setAddLabeModal(false)} style={styles.saveBtn}>
								<Text style={styles.saveText}>SAVE</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export default AddLabel;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "80%",
		height: '65%',
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
	labelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
	},
	labelText: {
		color: '#000',
		fontSize: rMS(16),
		marginLeft: 10,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: rMS(15),
		marginTop: 20,
	},
	cancelBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 12,
		borderColor: '#598931',
		borderWidth: 1.5,
		borderRadius: 10
	},
	cancelText: {
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
