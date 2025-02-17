import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { rMS } from "../../Utils/Responsive";
import BackIcon from "../../../SvgIcons/BackIcon";
import Staricon from "../../../SvgIcons/Staricon";
import Tasksicon from "../../../SvgIcons/Tasksicon";
import ViewIcon from "../../../SvgIcons/ViewIcon";
import PlusIcon from "../../../SvgIcons/PlusIcon.jsx";
import UndoIcon from "../../../SvgIcons/UndoIcon";
import RedoIcon from "../../../SvgIcons/RedoIcon";
import PaletIcon from "../../../SvgIcons/PaletIcon";
import ThreedotIcon from "../../../SvgIcons/ThreedotIcon";

const CreateNote = ({ navigation }) => {
  const [noteText, setNoteText] = useState("");

  // const images = [
  //   require("../../SampleImage/Aman.jpg"),
  //   require("../../SampleImage/Brain.jpg"),
  //   require("../../SampleImage/Param.jpg"),
  // ];

  const [note, setNote] = useState({
    title: "",
    "details": [
      {
        "key": "711b4643ebf204cc5fa38869",
        "value": "<b><font color=\"#23f514\">Hosted URL to access</font></b>",
        "type": "checkbox",
        "checked": false,
        "time": "2024-10-19T07:27:55.551Z",
        "editor": "ishanyadav13290@gmail.com",
        "expanded": true,
        "nested": false
      },
      {
        "key": "9ff625f011a6fcc845d180e0",
        "value": "<a target=\"_blank\" onmousedown=\"this.contentEditable=false\" style=\"cursor:pointer\" href=\"https://notes-test-pqsz.onrender.com\">https://notes-test-pqsz.onrender.com</a>",
        "type": "checkbox",
        "checked": false,
        "time": "2024-10-22T11:41:19.803Z",
        "editor": "ishanyadav13290@gmail.com",
        "expanded": true,
        "nested": true
      },
      {
        "key": "7a34da4ac2904de09f66153d",
        "value": "<font color=\"#4df53a\"><b>URL to Deploy Automatically</b></font>",
        "type": "checkbox",
        "checked": false,
        "time": "2024-10-19T07:26:02.561Z",
        "editor": "ishanyadav13290@gmail.com",
        "expanded": true,
        "nested": false
      },
      {
        "key": "e44a95cfe6d3c52292897401",
        "value": "<a target=\"_blank\" onmousedown=\"this.contentEditable=false\" style=\"cursor:pointer\" href=\"https://api.render.com/deploy/srv-cs9lhm88fa8c73cc7q00?key=0Sig7EwLPK8\" contenteditable=\"false\">https://api.render.com/deploy/srv-cs9lhm88fa8c73cc7q00?key=0Sig7EwLPK8</a> ",
        "type": "checkbox",
        "checked": false,
        "time": "2024-11-30T08:41:56.196Z",
        "editor": "ishanyadav13290@gmail.com",
        "expanded": true,
        "nested": true
      }
    ],
    time: "",
    versions: [],
    userID: '',
    email: 'rohit@ceoitbox.in',
    "accessTo": [
      {
        "type": "editor",
        "email": "ishan.yadav@ceoitbox.in",
        "expiration": "2029-12-10T14:51:43.707Z",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocLjuwO9UExq7XYz1VrJxmXvE2I86eqQdWMrdSKySf6PLkz23g=s96-c",
        "emailSent": true,
        "read": true,
        "creator": {
          "email": "ishanyadav13290@gmail.com",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocJonIJ3GAcLiCwqMoYMGLvdcF2PxVWyvR8E9cVVbe5p31phxb6D3A=s96-c",
          "name": "Ishan Yadav"
        },
        "time": "2024-12-10T14:51:43.707Z",
        "_id": "6758558ab3bb05db0ef584d7"
      },
      {
        "type": "editor",
        "email": "ishan.yadav@ceoitbox.in",
        "expiration": "2029-12-10T14:51:43.707Z",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocLjuwO9UExq7XYz1VrJxmXvE2I86eqQdWMrdSKySf6PLkz23g=s96-c",
        "emailSent": true,
        "read": true,
        "creator": {
          "email": "ishanyadav13290@gmail.com",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocJonIJ3GAcLiCwqMoYMGLvdcF2PxVWyvR8E9cVVbe5p31phxb6D3A=s96-c",
          "name": "Ishan Yadav"
        },
        "time": "2024-12-10T14:51:43.707Z",
        "_id": "6758558ab3bb05db0ef584d7"
      },
      {
        "type": "editor",
        "email": "ishan.yadav@ceoitbox.in",
        "expiration": "2029-12-10T14:51:43.707Z",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocLjuwO9UExq7XYz1VrJxmXvE2I86eqQdWMrdSKySf6PLkz23g=s96-c",
        "emailSent": true,
        "read": true,
        "creator": {
          "email": "ishanyadav13290@gmail.com",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocJonIJ3GAcLiCwqMoYMGLvdcF2PxVWyvR8E9cVVbe5p31phxb6D3A=s96-c",
          "name": "Ishan Yadav"
        },
        "time": "2024-12-10T14:51:43.707Z",
        "_id": "6758558ab3bb05db0ef584d7"
      }
    ],
    label: [],
    password: "",
    type: "",
    audioLink: "",
    "colors": {
      "bg": "rgb(255,255,255)",
      "text": "rgb(0,0,0)"
    },
    typeChanged: false,
    getEmailUpdates: false,
    "tasks": {
      "assignee": [
        {
          "email": "ishanyadav030502@gmail.com",
          "picture": "https://lh3.googleusercontent.com/a/ACg8ocLVQQzYH1UC9RX069rbHl-Gg3xrU9_yK6aoDl2t6zYff-4OiA=s96-c",
          "emailSent": true,
          "reminderSent": false,
          "time": "2025-02-13T15:30:00.349Z"
        }
      ],
      "creator": {
        "email": "ishan.yadav@ceoitbox.in",
        "picture": "https://lh3.googleusercontent.com/a/ACg8ocJIPvkIB79CqTKPs2WpDIDCjhpxLCzwsPDrn_qu_T3Gw6Cwu9s=s96-c",
        "name": "Ishan Yadav"
      },
      "status": "pending",
      "dueDate": {
        "$date": "2025-02-27T18:30:00.000Z"
      },
      "createdAt": {
        "$date": "2025-02-13T15:30:08.899Z"
      },
      "updatedOn": {
        "$date": "2025-02-13T15:30:08.899Z"
      },
      "_id": {
        "$oid": "67add522b23d9db5d91f0551"
      }
    },
    masked: false,
    userPinned: false,
    userStarred: false,
    archived: false,
    trashed: false,
    deleteDate: null,
    lastEdited: {},
    normalReminders: [],
    locationReminders: [],
    "userPreferences": [
      {
        "userID": "66740eae37a1646ca1a5d91b",
        "pinned": true,
        "starred": true,
        "email": "ishanyadav13290@gmail.com",
        "_id": "6794afe00fb889cf053363d4"
      },
      {
        "userID": "66dfec09a99cc328cbe1792f",
        "pinned": true,
        "starred": true,
        "email": "ishan.yadav@ceoitbox.in",
        "_id": "67a32dd35bc2ac1789bd8bb6"
      }
    ],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Navigation */}
      <View style={styles.navContainer}>
        <View style={styles.leftNav}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.rightNav}>
          <TouchableOpacity>
            <Staricon />
          </TouchableOpacity>

          <TouchableOpacity>
            <Tasksicon />
          </TouchableOpacity>

          <TouchableOpacity>
            <ViewIcon />
          </TouchableOpacity>

          <TouchableOpacity style={styles.imageContainer}>
            {note?.accessTo?.map((user, index) => (
              <Image
                key={index}
                source={{ uri: user?.picture }}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: "rgb(255, 255, 255)",
                  position: "absolute", // Overlapping effect
                  left: index * 15, // Adjust spacing between images
                }}
              />
            ))}
            <View style={[styles.person_count, { left: note?.accessTo?.length * 15 }]}>
              <Text style={styles.count_text}>+4</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Middle Content (Text Editor) */}
      <View style={styles.middleContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#A0A0A0"
          multiline
          value={noteText}
          onChangeText={(text) => setNoteText(text)}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Write Something..."
          placeholderTextColor="#A0A0A0"
          multiline
          value={noteText}
          onChangeText={(text) => setNoteText(text)}
        />
      </View>

      {/* Bottom Navigation */}
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
          <TouchableOpacity>
            <PaletIcon />
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
    backgroundColor: "#FFF",
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
    backgroundColor: 'red',
    marginRight: 45,
  },

  image: {
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 2, // Border thickness
    borderColor: "rgb(255, 255, 255)", // Border color
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
    borderWidth: 2, // Border thickness
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
