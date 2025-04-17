import { Modal, Pressable, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { rMS } from '../../Utils/Responsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getItem } from '../../Utils/Storage';
import DatePicker from '../../../SvgIcons/DatePicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import AddTaskAsignee from './AddTaskAsignee';
import { useGlobalContext } from '../../Context/Context';
import { Avatar, Divider } from 'react-native-paper';
import AssignTaskAllEmails from './AssignTaskAllEmails';
import { uid } from 'uid';

const AssignTask = ({ setAssignTask, assignTask }) => {
	const userInfo = getItem('userProfileInfo');
	const [dueDate, setDueDate] = useState(new Date());
	const [showPriorityAccordion, setShowPriorityAccordion] = useState(false);
	const [email, setEmail] = useState([]);
	const [selectedPriority, setSelectedPriority] = useState('Low');
	const [addAsignee, setAddAsignee] = useState(false);
	const [allEmailModal, setAllEmailModal] = useState(false);
	const { assigneeText, setAssigneeText , assignTaskData, setAssignTaskData } = useGlobalContext();

	const [dueTime, setDueTime] = useState(new Date());
	const priorities = ['Low', 'Medium', 'High', 'Urgent'];

	const openTimePicker = () => {
		DateTimePickerAndroid.open({
			value: dueTime,
			mode: 'time',
			is24Hour: false,
			display: 'default',
			onChange: (event, selectedTime) => {
				if (selectedTime) {
					setDueTime(selectedTime);
				}
			},
		});
	};


	const openDateTimePicker = () => {
		DateTimePickerAndroid.open({
			value: dueDate,
			mode: 'date',
			display: 'default',
			onChange: (event, selectedDate) => {
				if (selectedDate) {
					setDueDate(selectedDate);
					openTimePicker(); // open time picker after selecting date
				}
			},
		});
	};



	const generateInitials = (email) => {
		if (!email) return '?';
		return email.charAt(0).toUpperCase()
	};

	const getColorForEmail = (email) => {
		const hash = Array.from(email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
		const colors = ['#FFB6C1', '#B0E0E6', '#FFD700', '#98FB98', '#DDA0DD', '#FA8072'];
		return colors[hash % colors.length];
	};



	// console.log('email',email);

	useEffect(() => {
		if (assigneeText && !email.some((e) => e.email === assigneeText.email)) {
			setEmail((prevEmails) => {
				const lowerEmail = assigneeText.email.toLowerCase();
				if (!prevEmails.some(e => e.email.toLowerCase() === lowerEmail)) {
					return [...prevEmails, { ...assigneeText, email: lowerEmail }];
				}
				return prevEmails;
			});

		}

		setAssigneeText('');
	}, [assigneeText]);

	// useEffect(() => {
	// 	console.log('email', email)
	// }, [email])



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

	const handleSaveTask = () => {
		const taskData = {
			assignee: email.map(e => ({
				email: e.email,
				picture: e.picture || {},
				emailSent: false,
				reminderSent: false,
				time: new Date().toISOString()
			})),
			priority: selectedPriority.toLowerCase(),
			creator: {
				email: userInfo.email,
				picture: userInfo.picture,
				name: userInfo.name
			},
			status: 'pending',
			dueDate: new Date(
				dueDate.getFullYear(),
				dueDate.getMonth(),
				dueDate.getDate(),
				dueTime.getHours(),
				dueTime.getMinutes(),
				0
			).toISOString(),
			createdAt:new Date().toISOString(),
			updatedOn:new Date().toISOString()
		};
	
		// console.log('Task Saved Data:', JSON.stringify(taskData, null, 2));
		console.log('task data ',taskData)
		setAssignTaskData(taskData);
		setAssignTask(false);
	};

	return (
		<Modal animationType="fade" visible={assignTask} transparent={true}>
			<Pressable style={styles.modalOverlay} onPress={() => setAssignTask(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
					<View style={styles.assignTaskContainer}>
						<Text style={styles.assignTaskText}>Assign Task</Text>
					</View>
					<View style={styles.seprator}>
						<Divider />
					</View>

					<View style={styles.midContainer}>
						<Text style={styles.midContainerText}>Assignee</Text>
						<View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
							<View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
								{email.map((e, index) => (
									e.picture !== '' ? (
										<Image key={index} style={styles.image} source={{ uri: e.picture }} />
									) : (
										<Avatar.Text
											key={index}
											size={24}
											label={generateInitials(e.email)}
											style={{ backgroundColor: getColorForEmail(e.email) }}
										/>
									)
								))}

							</View>

							<TouchableOpacity onPress={() => setAddAsignee(true)}>
								<AntDesign name={'plus'} size={20} color={'#000000'} />
							</TouchableOpacity>

							{
								email.length > 0 ? (
									<TouchableOpacity onPress={() => setAllEmailModal(true)}>
										<Text style={{ fontFamily: 'Poppins-Medium', fontSize: 10, color: '#598931' }}>See all</Text>
									</TouchableOpacity>
								) : null
							}
						</View>
					</View>

					{
						allEmailModal && <AssignTaskAllEmails allEmailModal={allEmailModal} setAllEmailModal={setAllEmailModal} email={email} setEmail={setEmail} />
					}

					{
						addAsignee && <AddTaskAsignee addAsignee={addAsignee} setAddAsignee={setAddAsignee} />
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
							{/* Date Picker */}
							<TouchableOpacity onPress={openDateTimePicker}>
								<DatePicker stroke={'#987FA8'} />
							</TouchableOpacity>
							<Text style={styles.dateText}>
								{dueDate.toLocaleDateString('en-GB')}
							</Text>

							{/* Time Picker */}
							<TouchableOpacity onPress={openTimePicker}>
								<AntDesign name="clockcircleo" size={19} color="#987FA8" style={{ marginLeft: 10 }} />
							</TouchableOpacity>
							<Text style={styles.dateText}>
								{dueTime.toLocaleTimeString('en-US', {
									hour: '2-digit',
									minute: '2-digit',
								})}
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
						<TouchableOpacity style={styles.btn2} onPress={() => handleSaveTask()}>
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