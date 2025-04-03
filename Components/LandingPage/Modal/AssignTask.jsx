import { Modal, Pressable, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getItem } from '../../Utils/Storage';
import DatePicker from '../../../SvgIcons/DatePicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AddTaskAsignee from './AddTaskAsignee';
import { useGlobalContext } from '../../Context/Context';
import { Avatar } from 'react-native-paper';

const AssignTask = ({ setAssignTask, assignTask }) => {
	const userInfo = getItem('userProfileInfo');
	const [dueDate, setDueDate] = useState(new Date());
	const [showPriorityAccordion, setShowPriorityAccordion] = useState(false);
	const [email, setEmail] = useState([]);
	const [selectedPriority, setSelectedPriority] = useState('Low');
	const [addAsignee, setAddAsignee] = useState(false);
	const [avtarLetter, setAvtarLetter] = useState('');
	const { assigneeText, setAssigneeText } = useGlobalContext();

	const priorities = ['Low', 'Medium', 'High', 'Urgent'];

	const openDatePicker = () => {
		DateTimePickerAndroid.open({
			value: dueDate,
			mode: 'date',
			display: 'default',
			onChange: (event, selectedDate) => {
				if (selectedDate) {
					setDueDate(selectedDate);
				}
			},
		});
	};

	// console.log('email',email);

	useEffect(() => {
		if (assigneeText && !email.includes(assigneeText)) { 
			setEmail((prevEmails) => [...prevEmails, assigneeText]);
		}
		setAssigneeText('');
	}, [assigneeText]);
	


	const togglePriorityAccordion = () => {
		setShowPriorityAccordion(!showPriorityAccordion);
	};

	const selectPriority = (priority) => {
		setSelectedPriority(priority);
		setShowPriorityAccordion(false);
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case 'Low':
				return '#000';
			case 'Medium':
				return '#000';
			case 'High':
				return '#000';
			case 'Urgent':
				return '#000';
			default:
				return '#000';
		}
	};

	return (
		<Modal animationType="fade" visible={assignTask} transparent={true}>
			<Pressable style={styles.modalOverlay} onPress={() => setAssignTask(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View style={styles.assignTaskContainer}>
						<Text style={styles.assignTaskText}>Assign Task</Text>
					</View>
					<View style={styles.seprator}></View>

					{/* Assignee */}
					<View style={styles.midContainer}>
						<Text style={styles.midContainerText}>Assignee</Text>
						<View style={{ flexDirection: 'row', alignItems:'center' , gap:5 }}>
							<View style={{ flexDirection: 'row',gap:2 , alignItems:'center'}}>
								{email.map((e, index) => (
									<Image key={index} style={styles.image} source={{ uri: e }} />
								))}
								{
									avtarLetter !== '' ? (
										<Avatar.Text size={24} label={avtarLetter} />
									) : null
								}
							</View>

							<TouchableOpacity onPress={() => setAddAsignee(true)}>
								<AntDesign name={'plus'} size={20} color={'#000000'} />
							</TouchableOpacity>
						</View>
					</View>

					{
						addAsignee && <AddTaskAsignee addAsignee={addAsignee} setAddAsignee={setAddAsignee} avtarLetter={avtarLetter} setAvtarLetter={setAvtarLetter} />
					}

					{/* Created By */}
					<View style={styles.midContainer}>
						<Text style={styles.midContainerText}>Created By</Text>
						<View style={styles.userContainer}>
							<Image style={styles.image} source={{ uri: userInfo.picture }} />
							<Text style={styles.userText}>You</Text>
						</View>
					</View>

					{/* Due Date (Opens Date Picker) */}
					<View style={styles.midContainer}>
						<Text style={styles.midContainerText}>Due Date</Text>
						<View style={styles.dateContainer}>
							<TouchableOpacity onPress={openDatePicker}>
								<DatePicker stroke={'#987FA8'} />
							</TouchableOpacity>
							<Text style={styles.dateText}>
								{dueDate.toLocaleDateString('en-GB')}
							</Text>
						</View>
					</View>

					{/* Set Priority with Accordion */}
					<View style={styles.midContainer}>
						<Text style={styles.midContainerText}>Set Priority</Text>
						<View style={styles.priorityAccordionContainer}>
							<TouchableOpacity
								style={styles.priorityContainer}
								onPress={togglePriorityAccordion}
							>
								<Text style={[
									styles.priorityText,
									{ color: getPriorityColor(selectedPriority) }
								]}>
									{selectedPriority}
								</Text>
								<AntDesign
									name={showPriorityAccordion ? 'up' : 'down'}
									size={13}
									color={'#000'}
								/>
							</TouchableOpacity>

							{showPriorityAccordion && (
								<View style={styles.accordionContent}>
									{priorities.map((priority) => (
										<TouchableOpacity
											key={priority}
											style={styles.priorityItem}
											onPress={() => selectPriority(priority)}
										>
											<Text style={[
												styles.priorityItemText,
												{
													color: getPriorityColor(priority),
													fontWeight: selectedPriority === priority ? 'normal' : 'normal'
												}
											]}>
												{priority}
											</Text>
										</TouchableOpacity>
									))}
								</View>
							)}
						</View>
					</View>

					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.btn1} onPress={() => setAssignTask(false)}>
							<Text style={styles.btn1Text}>CANCEL</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btn2} onPress={() => setAssignTask(false)}>
							<Text style={styles.btn2Text}>SAVE</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export default AssignTask;

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
	assignTaskContainer: {
		alignItems: 'flex-start',
	},
	assignTaskText: {
		color: '#000',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(21),
	},
	seprator: {
		width: '100%',
		height: 1.3,
		backgroundColor: '#E9E9E9',
		marginVertical: 10,
	},
	midContainer: {
		width: '90%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		alignSelf: 'center',
		marginVertical: 10,
	},
	midContainerText: {
		color: '#7D7D7D',
		fontFamily: 'Poppins-Medium',
		fontSize: rMS(14),
	},
	image: {
		width: 28,
		height: 28,
		borderRadius: 14,
		borderWidth: 2,
		borderColor: "rgb(255, 255, 255)",
	},
	userContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	userText: {
		color: '#7D7D7D',
		fontFamily: 'Poppins-Medium',
		fontSize: 11,
	},
	dateContainer: {
		flexDirection: 'row',
		gap: 7,
		alignItems: 'center',
	},
	dateText: {
		fontFamily: 'Poppins-Medium',
		fontSize: 11,
	},
	priorityAccordionContainer: {
		position: 'relative',
	},
	priorityContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	priorityText: {
		fontFamily: 'Poppins-Medium',
		fontSize: 13,
	},
	accordionContent: {
		position: 'absolute',
		top: 25,
		right: 0,
		backgroundColor: '#FFFFFF',
		borderRadius: 8,
		width: 100,
		padding: 5,
		elevation: 4,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		zIndex: 10,
	},
	priorityItem: {
		paddingVertical: 8,
		paddingHorizontal: 10,
	},
	priorityItemText: {
		fontFamily: 'Poppins-Medium',
		fontSize: 13,
	},
	btnContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: rMS(20),
		gap: 20
	},
	btn1: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: rMS(10),
		paddingVertical: rMS(5),
		backgroundColor: "#FFF",
		borderRadius: rMS(10),
		borderColor: "#598931",
		borderWidth: 1,
	},
	btn2: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: rMS(16),
		paddingVertical: rMS(6),
		backgroundColor: "#598931",
		borderRadius: rMS(10),
	},
	btn1Text: {
		fontFamily: "Poppins-Medium",
		fontSize: rMS(12),
		color: "#598931",
	},
	btn2Text: {
		fontFamily: "Poppins-Medium",
		fontSize: rMS(13),
		color: "#FFF",
	},
});