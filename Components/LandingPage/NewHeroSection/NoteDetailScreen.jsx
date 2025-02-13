import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { getItem } from "../../Utils/Storage";
import axios from "axios";
import { rVS } from "../../Utils/Responsive";
import LeftSvg from "../../../SvgIcons/LeftSvg";
import { useNavigation } from "@react-navigation/native";
import StarBiggerView from "../../../SvgIcons/StarBiggerView";
import Task from "../../../SvgIcons/Task";
import EyeBiggerView from "../../../SvgIcons/EyeBiggerView";
import User_icon from '../../../SvgIcons/User_icon'

const NoteDetailScreen = ({ route }) => {
  const [singleNoteData, setSingleNoteData] = useState([]);

  const item = route?.params?.item;

  const navigation = useNavigation();


  const getSingleNoteData = async () => {
    try {
      const token = await getItem('token');

      const response = await axios.get(
        `https://notes.ceoitbox.com/api/getNote/view/note/v2/${item._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // console.log('singleNote api data', response.data);
      setSingleNoteData(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    getSingleNoteData();
  }, [])

  return (
    <View style={styles.container}>

      <View style={{ marginHorizontal: 20, marginTop: 20 , flexDirection:'row' , justifyContent:'space-between' ,}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LeftSvg />
        </TouchableOpacity>
        <View style={{flexDirection:'row',gap:20}}>
          <StarBiggerView />
          <Task />
          <EyeBiggerView />
          <TouchableOpacity>
            <User_icon />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.title}>{singleNoteData.title}</Text>
      <FlatList
        data={singleNoteData.details}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.description}>{item?.value}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: rVS(3),
    marginHorizontal: 20,
    marginTop: 20,
  },
  description: {
    marginHorizontal: 20,
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    fontFamily: 'Poppins-Medium'
  },
});

export default NoteDetailScreen;
