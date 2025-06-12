import React, { createContext, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { rMS } from '../Utils/Responsive';
import { getItem, removeItem, setItem } from '../Utils/Storage';
import axios from "axios";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const api = axios.create({
  baseURL: "https://notes.ceoitbox.com",
});


const apiLink = "https://notes.ceoitbox.com";

export const GlobalProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("Notes");
  const [token, setToken] = useState(getItem('token'));
  const [allNotesData, setAllNotesData] = useState([]);
  const [singleNoteData, setSingleNoteData] = useState([]);
  const [starredData, setStarredData] = useState(undefined);
  const [listView, setListView] = useState(false || getItem('listView'))
  const [update, setUpdate] = useState({});
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState(null);
  const [updateSearchQuery, setUpdateSearchQuery] = useState('');
  const [createNoteStar, setCreateNoteStar] = useState(false)
  const [createNoteMask, setCreateNoteMask] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('#FFF')
  const [ assigneeText , setAssigneeText ] = useState('');
  const [ assigneeAllEmail , setAssigneeAllEmail ] = useState([]);
  const [ assignTaskData , setAssignTaskData ] = useState('');
  const [ addCollaboratorData , setAddCollaboratorData ] = useState([]);
  const [ secureNotePwd , setSecureNotePwd ] = useState("");
  const [ paginationPage , setPaginationPage  ] = useState(1);
  const [ totalPaginationPages , setTotalPaginationPages] = useState(null);


  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };


  
  


  const showToast = ({ type, message }) => {
    Toast.show({
      type: type.toLowerCase(),
      position: 'top',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const toastConfig = {
    success: ({ text1 }) => (
      <BaseToast
        style={{ borderLeftColor: 'green', backgroundColor: '#FFF' }}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
        text1={text1}
        text1Style={{ color: 'black', fontSize: rMS(16), fontFamily: 'Poppins-Medium' }}
        renderLeadingIcon={() => (
          <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
            <MaterialIcons name="check-circle" size={25} color="green" />
          </View>
        )}
      />
    ),
    error: ({ text1 }) => (
      <BaseToast
        style={{ borderLeftColor: 'red', backgroundColor: '#FFF' }}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
        text1={text1}
        text1Style={{ color: 'black', fontSize: 16, fontFamily: 'Poppins-Medium' }}
        renderLeadingIcon={() => (
          <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
            <MaterialIcons name="error" size={20} color="red" />
          </View>
        )}
      />
    ),
    warning: ({ text1 }) => (
      <BaseToast
        style={{ borderLeftColor: 'orange', backgroundColor: '#FFF' }}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
        text1={text1}
        text1Style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}
        renderLeadingIcon={() => (
          <View style={{ alignItems: 'center', flexDirection: 'row', marginLeft: 20 }}>
            <MaterialIcons name="warning" size={20} color="orange" />
          </View>
        )}
      />
    ),
  };

  const UserLogout = async () => {
    removeItem('userProfileInfo');
    removeItem('token');
    return "Logged Out Successfully!";
  };

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '586907532420-51eo3o1fgcb3tcuh8e06nlrlsooa77op.apps.googleusercontent.com',
      scopes: ['profile', 'email', 'openid'],
      offlineAccess: true,
    });
  };

  const signInWithGoogle = async (navigation) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { idToken, serverAuthCode, user } = userInfo.data;

      // console.log('idToken : ',idToken)

      const data = {
        idToken,
        scopes: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
          "openid",
          "profile",
          "email"
        ],
        serverAuthCode,
        user: {
          email: user.email,
          familyName: user.familyName,
          givenName: user.givenName,
          id: user.id,
          name: user.name,
          photo: user.photo
        }
      };

      // console.log('42 userin', userInfo.data);

      const response = await axios.post('https://notes.ceoitbox.com/api/signin/mobile/v2', data);

      // console.log('userInfo',response.data);

      if (response?.data?.token) {
        // console.log('userProfile',response?.data?.body)
        setItem('listView', false);
        setItem('userProfileInfo', response?.data?.body);
        setItem('token', response?.data?.token);
        navigation.navigate('HomeScreen');
      }else{
        navigation.navigate('SignUp');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  const getAllNotes = async (token) => {
    try {
      // https://notes.ceoitbox.com/api/getNotes/v3?archived=false&trashed=false&page=2&limit=10
      const { data } = await api.get(`/api/getNotes/v3?archived=false&trashed=false&page=${paginationPage}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if(data){
        // console.log('data : ',data?.pagination?.totalPages)
        setTotalPaginationPages(data?.pagination?.totalPages)
        if (paginationPage === 1) {
          setAllNotesData(data?.notes);
        } else {
          setAllNotesData(prev => [...prev, ...data?.notes]);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const getSingleNote = async (token, id) => {
    try {
      const { data } = await api.get(`/api/getNote/view/note/v2/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setSingleNoteData(data);
    } catch (error) {
      throw error;
    }
  };

  const SignInWithEmailAndPassword = async (loginInfo , navigation) => {
    try {
      const { data } = await api.post(`/api/signin`, loginInfo);
      // console.log('userInfo', data);
      if (data) {
        navigation.navigate('HomeScreen');
        setItem('listView', false);
        setItem('token', data?.token);
        setItem('userProfileInfo', data?.body);
      }
    } catch (error) {
      throw error;
    }
  };

  const getStarredNotesData = async () => {
    try {
      const { data } = await api.get('/api/getNotes/starred/v2', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      if (data) {
        setStarredData(data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getUpdates = async () => {
    try {
      const { data } = await api.get('/api/getAllFeatures');
      if (data) {
        setUpdate(data.features);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    headers,
    showToast,
    UserLogout,
    activeSection,
    setActiveSection,
    configureGoogleSignIn,
    signInWithGoogle,
    getAllNotes,
    allNotesData,
    setAllNotesData,
    getSingleNote,
    singleNoteData,
    setSingleNoteData,
    SignInWithEmailAndPassword,
    apiLink,
    getStarredNotesData,
    starredData,
    setStarredData,
    listView,
    setListView,
    getUpdates,
    update,
    setUpdate,
    updateSearchQuery,
    setUpdateSearchQuery,
    details,
    setDetails,
    title,
    setTitle,
    createNoteStar,
    setCreateNoteStar,
    createNoteMask,
    setCreateNoteMask,
    setBackgroundColor,
    backgroundColor,
    assigneeText,
    setAssigneeText,
    assigneeAllEmail,
    setAssigneeAllEmail,
    assignTaskData,
    setAssignTaskData,
    addCollaboratorData,
    setAddCollaboratorData,
    secureNotePwd,
    setSecureNotePwd,
    paginationPage,
    setPaginationPage,
    totalPaginationPages,
    setTotalPaginationPages
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
      <Toast config={toastConfig} />
    </GlobalContext.Provider>
  );
};
