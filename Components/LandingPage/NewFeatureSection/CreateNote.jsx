import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import BackIcon from "../../../SvgIcons/BackIcon";
import Staricon from "../../../SvgIcons/Staricon";
import Tasksicon from "../../../SvgIcons/Tasksicon";
import ViewIcon from "../../../SvgIcons/ViewIcon";
import PlusIcon from "../../../SvgIcons/PlusIcon.jsx";
import UndoIcon from "../../../SvgIcons/UndoIcon";
import RedoIcon from "../../../SvgIcons/RedoIcon";
import PaletIcon from "../../../SvgIcons/PaletIcon";
import ThreedotIcon from "../../../SvgIcons/ThreedotIcon";
import TextEditor from "./TextEditor.jsx";
import Aa from "../../../SvgIcons/Aa.jsx";
import FilledStar from "../../../SvgIcons/FilledStar.jsx";
import { useGlobalContext } from "../../Context/Context.jsx";
import ApiSaveNoteData from "./utils/ApiSaveNoteData.js";
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SelectEditorBackground from "./SelectEditorBackground.jsx";
import AssignTask from "../Modal/AssignTask.jsx";
import { rMS, rS, rVS } from "../../Utils/Responsive.jsx";
import DatePicker from "../../../SvgIcons/DatePicker.jsx";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Avatar } from 'react-native-paper';
import AssignTaskAllEmails from "../Modal/AssignTaskAllEmails.jsx";
import AddTaskAsignee from "../Modal/AddTaskAsignee.jsx";

const CreateNote = ({ navigation }) => {
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [editorBackground, setEditorBackground] = useState(false);
  const [assignTask, setAssignTask] = useState(false);
  const [showStatusAccordion, setShowStatusAccordion] = useState(false);
  const [showPriorityAccordion, setShowPriorityAccordion] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [selectedPriority, setSelectedPriority] = useState('Low');
  const [dueDate, setDueDate] = useState(new Date());
  const [dueTime, setDueTime] = useState(new Date());
  const [showTaskContainer, setShowTaskContainer] = useState(true);
  const [addAsignee, setAddAsignee] = useState(false);
  const [allEmailModal, setAllEmailModal] = useState(false);
  
  const statuses = ['Pending', 'Progress', 'Completed'];
  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  
  const { 
    createNoteStar, 
    setCreateNoteStar, 
    title, 
    details, 
    setTitle, 
    setDetails, 
    setCreateNoteMask, 
    createNoteMask, 
    backgroundColor, 
    setBackgroundColor, 
    assignTaskData, 
    setAssignTaskData,
    assigneeText,
    setAssigneeText
  } = useGlobalContext();

  const editorRef = useRef(null);

  // Get assignees from context
  const assignees = assignTaskData?.assignee || [];
  
  // Effect to update status and priority when assignTaskData changes
  useEffect(() => {
  if (assignTaskData) {
    // Update status and priority based on assignTaskData
    if (assignTaskData.status) {
      const statusMap = {
        'pending': 'Pending',
        'progress': 'Progress',
        'completed': 'Completed'
      };
      setSelectedStatus(statusMap[assignTaskData.status] || 'Pending');
    }
    
    if (assignTaskData.priority) {
      const priorityMap = {
        'low': 'Low',
        'medium': 'Medium',
        'high': 'High',
        'urgent': 'Urgent'
      };
      setSelectedPriority(priorityMap[assignTaskData.priority] || 'Low');
    }
    
    // Update date and time if available
    if (assignTaskData.dueDate) {
      const dueDateObj = new Date(assignTaskData.dueDate);
      setDueDate(dueDateObj);
      setDueTime(dueDateObj);
    }

    // Show the task container if there's task data
    setShowTaskContainer(true);
  }
}, [assignTaskData]);

  const handleAaIconPress = () => {
    setToolbarVisible(!toolbarVisible);
  };

  const saveAndBack = async () => {
    try {
      await ApiSaveNoteData(title, details, setTitle, setDetails, createNoteStar, setCreateNoteStar, createNoteMask, setCreateNoteMask, backgroundColor, setBackgroundColor, setAssignTaskData, assignTaskData);
      navigation.goBack();
    } catch (error) {
      console.error('API Call Failed:', error);
    }
  };

  const handleMask = () => {
    setCreateNoteMask(!createNoteMask);
  };

  const toggleStatusAccordion = () => {
    setShowStatusAccordion(!showStatusAccordion);
    setShowPriorityAccordion(false);
  };

  const togglePriorityAccordion = () => {
    setShowPriorityAccordion(!showPriorityAccordion);
    setShowStatusAccordion(false);
  };

  const selectStatus = (status) => {
    setSelectedStatus(status);
    setShowStatusAccordion(false);
    
    // Update the assignTaskData with the new status
    if (assignTaskData) {
      const statusMap = {
        'Pending': 'pending',
        'Progress': 'progress',
        'Completed': 'completed'
      };
      
      setAssignTaskData({
        ...assignTaskData,
        status: statusMap[status] || 'pending',
        updatedOn: new Date().toISOString()
      });
    }
  };

  const selectPriority = (priority) => {
    setSelectedPriority(priority);
    setShowPriorityAccordion(false);
    
    // Update the assignTaskData with the new priority
    if (assignTaskData) {
      const priorityMap = {
        'Low': 'low',
        'Medium': 'medium',
        'High': 'high',
        'Urgent': 'urgent'
      };
      
      setAssignTaskData({
        ...assignTaskData,
        priority: priorityMap[priority] || 'low',
        updatedOn: new Date().toISOString()
      });
    }
  };

  const openTimePicker = () => {
    DateTimePickerAndroid.open({
      value: dueTime,
      mode: 'time',
      is24Hour: false,
      display: 'default',
      onChange: (event, selectedTime) => {
        if (selectedTime) {
          setDueTime(selectedTime);
          updateDueDate(dueDate, selectedTime);
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

  // Function to update dueDate in assignTaskData
  const updateDueDate = (date, time) => {
    if (assignTaskData) {
      const newDueDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        0
      );
      
      setAssignTaskData({
        ...assignTaskData,
        dueDate: newDueDate.toISOString(),
        updatedOn: new Date().toISOString()
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FB2727';
      case 'Progress':
        return '#FFA500';
      case 'Completed':
        return '#598931';
      default:
        return '#000';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return '#598931';
      case 'Medium':
        return '#E8DF0D';
      case 'High':
        return '#FFA500';
      case 'Urgent':
        return '#FB2727';
      default:
        return '#000';
    }
  };

  const generateInitials = (email) => {
    if (!email) return 'K';
    return email.charAt(0).toUpperCase();
  };

  const getColorForEmail = (email) => {
    if (!email) return '#598931';
    const hash = Array.from(email).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['#FFB6C1', '#B0E0E6', '#FFD700', '#98FB98', '#DDA0DD', '#FA8072'];
    return colors[hash % colors.length];
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: backgroundColor }]}>
      {/* Top Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.leftNav}>
          <TouchableOpacity onPress={saveAndBack}>
            <BackIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.rightNav}>
          <TouchableOpacity onPress={() => setCreateNoteStar(!createNoteStar)}>
            {
              createNoteStar ? (
                <FilledStar width={25} height={24} />
              ) : (
                <Staricon />
              )
            }
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAssignTask(true)}>
            <Tasksicon />
          </TouchableOpacity>

          {
            assignTask && <AssignTask assignTask={assignTask}
              setAssignTask={setAssignTask}
            />
          }

          <TouchableOpacity onPress={handleMask}>
            {
              createNoteMask ? (
                <Feather name={'eye-off'} size={20} color={'#606160'} />
              ) : (
                <ViewIcon />
              )
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageContainer}>
            <View>
              <Image
                source={{ uri: 'https://lh3.googleusercontent.com/a/ACg8ocIPg3YnhwZtnv5pUZ1ZZ1jWJopGoKCLhXOMQS9xIY2EPz-iXB8=s96-c' }}
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: 13.5,
                  borderWidth: 1,
                  borderColor: "rgb(255, 255, 255)",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TextEditor ref={editorRef} setToolbarVisible={setToolbarVisible} toolbarVisible={toolbarVisible} backgroundColor={backgroundColor} />

      {showTaskContainer && assignTaskData && (
        <View style={styles.taskContainer}>
          <View style={styles.closeContainer}>
            <TouchableOpacity onPress={() => setShowTaskContainer(false)}>
              <MaterialCommunityIcons name={'close'} size={20} color={'#598931'} />
            </TouchableOpacity>
          </View>
          <View style={styles.insideTaskContainer}>
            <View>
              <Text style={styles.taskText}>Task Assigned to</Text>
              <View style={styles.assignContainer}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                  {assignees && assignees.length > 0 ? (
                    assignees.map((assignee, index) => (
                      assignee.picture ? (
                        <Image key={index} style={styles.assigneeImage} source={{ uri: assignee.picture }} />
                      ) : (
                        <Avatar.Text
                          key={index}
                          size={24}
                          label={generateInitials(assignee.email)}
                          style={{ backgroundColor: getColorForEmail(assignee.email) }}
                        />
                      )
                    ))
                  ) : (
                    <View style={styles.emailContainer}>
                      <Text style={styles.emailText}>K</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity onPress={() => setAddAsignee(true)}>
                  <Feather name={'plus'} size={20} color={'#606160'} />
                </TouchableOpacity>
                {assignees && assignees.length > 0 && (
                  <TouchableOpacity onPress={() => setAllEmailModal(true)}>
                    <Text style={styles.seeAll}>See all</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View>
              <Text style={styles.taskText}>Status</Text>
              <View style={styles.priorityAccordionContainer}>
                <TouchableOpacity
                  style={styles.accordionContainer}
                  onPress={toggleStatusAccordion}
                >
                  <Text style={[
                    styles.statusText,
                    { color: getStatusColor(selectedStatus) }
                  ]}>
                    {selectedStatus}
                  </Text>
                  <AntDesign
                    name={showStatusAccordion ? 'up' : 'down'}
                    size={13}
                    color={'#000'}
                  />
                </TouchableOpacity>

                {showStatusAccordion && (
                  <View style={styles.accordionContent2}>
                    {statuses.map((status) => (
                      <TouchableOpacity
                        key={status}
                        style={styles.priorityItem}
                        onPress={() => selectStatus(status)}
                      >
                        <Text style={[
                          styles.priorityItemText,
                          {
                            color: '#000',
                            fontFamily: selectedStatus === status ? 'Poppins-Medium' : 'Poppins-Regular'
                          }
                        ]}>
                          {status}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            </View>
          </View>
          <View style={styles.insideTaskContainer}>
            <View>
              <Text style={styles.taskText}>Due Date</Text>
              <View style={styles.dateContainer}>
                <TouchableOpacity onPress={openDateTimePicker}>
                  <DatePicker stroke={'#987FA8'} />
                </TouchableOpacity>
                <Text style={styles.dateText}>
                  {dueDate.toLocaleDateString('en-GB')}
                </Text>
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
            <View>
              <Text style={styles.taskText}>Priority</Text>
              <View style={styles.priorityAccordionContainer}>
                <TouchableOpacity
                  style={styles.accordionContainer}
                  onPress={togglePriorityAccordion}
                >
                  <Text style={[
                    styles.statusText,
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
                            color: '#000',
                            fontFamily: selectedPriority === priority ? 'Poppins-Medium' : 'Poppins-Regular'
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
          </View>
        </View>
      )}

      {/* Add the modals for adding assignees and viewing all assignees */}
      {addAsignee && (
        <AddTaskAsignee 
          addAsignee={addAsignee}
          setAddAsignee={setAddAsignee}
        />
      )}
      
      {allEmailModal && assignTaskData && (
        <AssignTaskAllEmails
          allEmailModal={allEmailModal}
          setAllEmailModal={setAllEmailModal}
          email={assignTaskData.assignee || []}
          setEmail={(updatedEmails) => {
            setAssignTaskData({
              ...assignTaskData,
              assignee: updatedEmails,
              updatedOn: new Date().toISOString()
            });
          }}
        />
      )}

      <View style={styles.bottom_navContainer}>
        <View style={styles.bottom_leftNav}>
          <TouchableOpacity>
            <PlusIcon width={24} height={24} color={"#606160"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <UndoIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <RedoIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setEditorBackground(!editorBackground)}>
            <PaletIcon />
          </TouchableOpacity>
          {
            editorBackground && <SelectEditorBackground editorBackground={editorBackground}
              setEditorBackground={setEditorBackground}
              onColorChange={setBackgroundColor} />
          }
          <TouchableOpacity onPress={handleAaIconPress}>
            <Aa />
          </TouchableOpacity>
        </View>

        <View style={styles.bottom_rightNav}>
          <TouchableOpacity>
            <Text style={styles.last_view}>Last Edited on 23rd July, 2024</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <ThreedotIcon />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  navContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  leftNav: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    gap: 15,
    color: "#606160",
  },

  middleContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  titleInput: {
    fontSize: 22,
    color: "#333",
    textAlignVertical: "top",
    borderRadius: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    borderRadius: 10,
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 2,
    borderColor: "rgb(255, 255, 255)",
  },

  person_count: {
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: 'rgb(189, 189, 189)',
    borderColor: 'white',
    borderWidth: 2,
  },

  count_text: {
    fontSize: 11,
    color: 'rgb(255, 255, 255)'
  },

  taskContainer: {
    width: '95%',
    flexDirection: 'column',
    gap: rVS(10),
    alignSelf: 'center',
    backgroundColor: '#FCFCFC',
    borderRadius: rVS(10),
    padding: rVS(10),
    marginBottom: 5,
  },
  closeContainer: {
    alignSelf: 'flex-end'
  },
  insideTaskContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: rMS(14),
    color: '#000',
    fontFamily: 'Poppins-Medium',
    marginBottom: 5,
  },
  emailContainer: {
    width: rVS(24),
    height: rVS(24),
    borderRadius: rVS(12),
    backgroundColor: '#598931',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailText: {
    fontSize: rVS(10),
    color: 'rgb(255, 255, 255)',
  },
  assignContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  seeAll: {
    fontSize: rMS(10),
    color: '#598931',
    fontFamily: 'Poppins-Medium',
  },
  assigneeImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgb(255, 255, 255)",
  },
  
  // Accordion styles
  priorityAccordionContainer: {
    position: 'relative',
  },
  accordionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: rS(15),
    paddingVertical: rS(3),
    borderWidth: 1,
    borderColor: '#797980',
    borderRadius: rVS(3),
    minWidth: rVS(100),
    justifyContent: 'space-between',
  },
  statusText: {
    fontSize: rMS(13),
    fontFamily: 'Poppins-Medium',
  },
  accordionContent: {
    position: 'absolute',
    top:-160,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: rS(120),
    padding: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  accordionContent2: {
    position: 'absolute',
    top:-121,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    width: rS(120),
    padding: 5,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    zIndex: 10,
  },
  priorityItem: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  priorityItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: rMS(13),
  },
  
  // Date container styles
  dateContainer: {
    flexDirection: 'row',
    gap: 7,
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },

  bottom_navContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  bottom_leftNav: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: "8%",
  },
  bottom_rightNav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    color: "#606160",
  },
  last_view: {
    fontFamily: "Poppins",
    fontSize: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F2F2F2",
    borderRadius: 32,
  },
});