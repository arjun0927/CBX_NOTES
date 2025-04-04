import { useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiSaveNoteData from './utils/ApiSaveNoteData';
import { useGlobalContext } from '../../Context/Context';

const NoteBackhandler = () => {
  const navigation = useNavigation();
  const { title, details, setTitle, setDetails, createNoteStar, setCreateNoteStar, createNoteMask, setCreateNoteMask, backgroundColor, setBackgroundColor } = useGlobalContext();

  // Use the handleBackPress with updated dependencies
  const handleBackPress = useCallback(async () => {
    try {
      
      await ApiSaveNoteData(title, details, setTitle, setDetails, createNoteStar, setCreateNoteStar, createNoteMask, setCreateNoteMask, backgroundColor, setBackgroundColor);
      
      navigation.goBack();
      return true;
    } catch (error) {
      console.error('API Call Failed:', error);
      return false;
    }
  }, [title, details, setTitle, setDetails, navigation, createNoteStar, setCreateNoteStar, createNoteMask, setCreateNoteMask, backgroundColor, setBackgroundColor ]); 

  // Register/unregister back button handler when handleBackPress changes
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => {
      backHandler.remove();
    };
  }, [handleBackPress]); 

  return null;
};

export default NoteBackhandler;