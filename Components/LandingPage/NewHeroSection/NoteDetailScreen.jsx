import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions } from "react-native";
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
import Feather from "react-native-vector-icons/Feather"
import AntDesign from "react-native-vector-icons/FontAwesome5"
import ThreeDotModal from "../Modal/ThreeDotModal";
import ThreeDots from "../../../SvgIcons/ThreeDots";
import { useGlobalContext } from "../../Context/Context";
import AddFields from "../Modal/AddFields";
import RenderHtml from 'react-native-render-html';
import ReactNativeHtml from "../../Features/jsFunctions/ReactNativeHtml";

const NoteDetailScreen = ({ route }) => {
  const [threeDotModalVisible, setThreeDotModalVisible] = useState(false);
  const [addFieldsVisible, setAddFieldsVisible] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const [text, setText] = useState('');
  const { getSingleNote, singleNoteData } = useGlobalContext();

  // console.log('details',singleNoteData)

  const { width } = Dimensions.get("window");

  const item = route?.params?.item;
  const navigation = useNavigation();

  const handleOpenBottomSheet = () => {
    if (isBottomSheetOpen) {
      bottomSheetRef.current?.close();
      setIsBottomSheetOpen(false);
    } else {
      bottomSheetRef.current?.expand();
      setIsBottomSheetOpen(true);
    }
  };
  


  const getSingleNoteData = async () => {
    try {
      const token = await getItem("token");

      await getSingleNote(token, item._id);

      // setSingleNoteData(response);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    getSingleNoteData();
    if (singleNoteData) {
      console.log('singleNoteData', singleNoteData);
    }
  
    // Ensure the bottom sheet is closed by default
    bottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
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

      <View style={styles.divider} />


      {/* <RenderHtml contentWidth={width} source={source} /> */}

      <FlatList
        data={singleNoteData.details}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.description}>
            <ReactNativeHtml item={item.value} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 70 }}
      />

      <View style={styles.bottomToolbar}>
        <TouchableOpacity onPress={handleOpenBottomSheet}>
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
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          placeholderTextColor="#999"
          onChangeText={(text) => setText(text)}
        />
        <TouchableOpacity onPress={() => setThreeDotModalVisible(true)}>
          <ThreeDots />
        </TouchableOpacity>
      </View>
      <AddFields bottomSheetRef={bottomSheetRef} isBottomSheetOpen={isBottomSheetOpen} setIsBottomSheetOpen={setIsBottomSheetOpen} />
      <ThreeDotModal setThreeDotModalVisible={setThreeDotModalVisible} threeDotModalVisible={threeDotModalVisible} />
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
    right: 0,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: rMS(15),
    zIndex: 100,
    elevation: 5,
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
