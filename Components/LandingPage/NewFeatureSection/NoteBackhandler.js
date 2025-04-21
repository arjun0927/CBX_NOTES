import { useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiSaveNoteData from './utils/ApiSaveNoteData';
import { useGlobalContext } from '../../Context/Context';

const NoteBackhandler = () => {
  const navigation = useNavigation();
  const { 
    title, 
    details, 
    setTitle, 
    setDetails, 
    createNoteStar, 
    setCreateNoteStar, 
    createNoteMask, 
    setCreateNoteMask, 
    backgroundColor, 
    setBackgroundColor, 
    assignTaskData, 
    setAssignTaskData, 
    addCollaboratorData, 
    setAddCollaboratorData,
    secureNotePwd , 
    setSecureNotePwd
  } = useGlobalContext();

  const handleBackPress = useCallback(async () => {
    try {
      await ApiSaveNoteData(
        title,
        details,
        setTitle,
        setDetails,
        createNoteStar,
        setCreateNoteStar,
        createNoteMask,
        setCreateNoteMask,
        backgroundColor,
        setBackgroundColor,
        setAssignTaskData,
        assignTaskData,
        addCollaboratorData,
        setAddCollaboratorData,
        secureNotePwd,
        setSecureNotePwd
      );
      
      navigation.goBack();
      return true;
    } catch (error) {
      console.error('Failed to save note:', error);
      navigation.goBack();
      return true;
    }
  }, [
    title, 
    details, 
    setTitle, 
    setDetails, 
    createNoteStar, 
    setCreateNoteStar, 
    createNoteMask, 
    setCreateNoteMask, 
    backgroundColor, 
    setBackgroundColor, 
    assignTaskData, 
    setAssignTaskData,
    addCollaboratorData,
    setAddCollaboratorData,
    secureNotePwd,
    setSecureNotePwd,
    navigation
  ]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [handleBackPress]); 

  return null;
};

export default NoteBackhandler;