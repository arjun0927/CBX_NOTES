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
import SelectEditorBackground from "./SelectEditorBackground.jsx";
import AssignTask from "../Modal/AssignTask.jsx";

const CreateNote = ({ navigation }) => {
  const [toolbarVisible, setToolbarVisible] = useState(false)
  const [editorBackground, setEditorBackground] = useState(false);
  const [assignTask, setAssignTask] = useState(false);
  const { createNoteStar, setCreateNoteStar, title, details, setTitle, setDetails, setCreateNoteMask, createNoteMask, backgroundColor, setBackgroundColor } = useGlobalContext();

  const editorRef = useRef(null);

  const handleAaIconPress = () => {
    setToolbarVisible(!toolbarVisible);
  };

  const saveAndBack = async () => {
    try {
      await ApiSaveNoteData(title, details, setTitle, setDetails, createNoteStar, setCreateNoteStar, createNoteMask, setCreateNoteMask, backgroundColor, setBackgroundColor);
      navigation.goBack();
    } catch (error) {
      console.error('API Call Failed:', error);
    }
  };

  const handleMask = () => {
    setCreateNoteMask(!createNoteMask);
  }

  const note = ["https://lh3.googleusercontent.com/a/ACg8ocIPg3YnhwZtnv5pUZ1ZZ1jWJopGoKCLhXOMQS9xIY2EPz-iXB8=s96-c", "https://lh3.googleusercontent.com/a/ACg8ocIPg3YnhwZtnv5pUZ1ZZ1jWJopGoKCLhXOMQS9xIY2EPz-iXB8=s96-c", "https://lh3.googleusercontent.com/a/ACg8ocIPg3YnhwZtnv5pUZ1ZZ1jWJopGoKCLhXOMQS9xIY2EPz-iXB8=s96-c"];

  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor:backgroundColor}]}>
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

          <TouchableOpacity onPress={()=> setAssignTask(true)}>
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
            {note?.map((user, index) => (
              <Image
                key={index}
                source={{ uri: user }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  borderWidth: 2,
                  borderColor: "rgb(255, 255, 255)",
                  position: "absolute",
                  left: index * 12,
                }}
              />
            ))}
            <View style={[styles.person_count, { left: note?.length * 11 }]}>
              <Text style={styles.count_text}>+4</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TextEditor ref={editorRef} setToolbarVisible={setToolbarVisible} toolbarVisible={toolbarVisible} backgroundColor={backgroundColor} />
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
    // backgroundColor: backgroundColor,
    // padding: 10,
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
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    color: "#606160",
  },

  // Middle content section
  middleContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  titleInput: {
    fontSize: 22,
    color: "#333",
    textAlignVertical: "top",
    // backgroundColor: 'red',
    borderRadius: 10,
  },

  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    // backgroundColor: 'red',
    borderRadius: 10,
  },

  // middle content section end here...
  imageContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 30,
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
