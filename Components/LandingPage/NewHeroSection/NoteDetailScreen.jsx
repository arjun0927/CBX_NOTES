import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { getItem } from "../../Utils/Storage";
import axios from "axios";
import { rMS, rVS } from "../../Utils/Responsive";
import LeftSvg from "../../../SvgIcons/LeftSvg";
import { useNavigation } from "@react-navigation/native";
import StarBiggerView from "../../../SvgIcons/StarBiggerView";
import Task from "../../../SvgIcons/Task";
import EyeBiggerView from "../../../SvgIcons/EyeBiggerView";
import User_icon from "../../../SvgIcons/User_icon";
import Plus from "../../../SvgIcons/Plus";
import Undo from "../../../SvgIcons/Undo";
import Redo from "../../../SvgIcons/Redo";
import Theme from "../../../SvgIcons/Theme";
import ThreeDots from "../../../SvgIcons/ThreeDots";
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/FontAwesome5"
import { getSingleNote } from "../../../apis";

const NoteDetailScreen = ({ route }) => {
  const [singleNoteData, setSingleNoteData] = useState([]);


  const item = route?.params?.item;
  const navigation = useNavigation();

  const getSingleNoteData = async () => {
    try {
      const token = await getItem("token");

      const response = await getSingleNote(token,item._id);

      console.log("singleNote api data", response);
      setSingleNoteData(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getSingleNoteData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftSvg />
        </TouchableOpacity>
        <View style={styles.headerIcons}>
          {/* <Feather name={"star"} size={22} color={'#606160'} /> */}
          {/* <AntDesign name={"star"} size={20} color={'#606160'} /> */}
          <TouchableOpacity>
            <StarBiggerView />
          </TouchableOpacity>
          <TouchableOpacity>
            <Task />
          </TouchableOpacity>
          <TouchableOpacity>
            <EyeBiggerView />
          </TouchableOpacity>
          <TouchableOpacity>
            <User_icon />
          </TouchableOpacity>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{singleNoteData.title}</Text>

      {/* Meta Info */}
      <View style={styles.metaInfo}>
        <Text style={styles.metaText}>Created By: {singleNoteData.email}</Text>
        <Text style={styles.metaText}>
          Accessing this note as: <Text style={styles.editorText}>Editor</Text>
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Note Content */}
      <FlatList
        data={singleNoteData.details}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.description}>{item?.value}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />

      {/* Bottom Toolbar */}
      <View style={styles.bottomToolbar}>
        <TouchableOpacity>
          <Plus />
        </TouchableOpacity>
        <TouchableOpacity>
          <Undo />
        </TouchableOpacity>
        <TouchableOpacity>
          <Redo />
        </TouchableOpacity>
        <TouchableOpacity>
          <Theme />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="Type here..." placeholderTextColor="#999" />
        <TouchableOpacity>
          <ThreeDots />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: rVS(3),
    marginHorizontal: 20,
    marginTop: 20,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: rMS(20),
    marginTop: 3,
  },
  metaText: {
    color: "#727272",
    fontFamily: "Poppins-Medium",
    fontSize: rMS(8.612),
  },
  editorText: {
    color: "black",
    fontFamily: "Poppins-Medium",
    fontSize: rMS(8.612),
  },
  divider: {
    width: "90%",
    height: 2,
    backgroundColor: "#F2F1F1",
    alignSelf: "center",
    marginTop: rMS(10),
  },
  description: {
    marginHorizontal: 20,
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    fontFamily: "Poppins-Medium",
  },
  bottomToolbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: rMS(15)
  },
  input: {
    flex: 1,
    height: 35,
    backgroundColor: "#F2F2F2",
    borderRadius: 32,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#333",
  },
});

export default NoteDetailScreen;
