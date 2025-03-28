import { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ApiSaveNoteData from './utils/ApiSaveNoteData';

const NoteBackhandler = () => {
	const navigation = useNavigation(); 
	const {saveNote} = ApiSaveNoteData()

	useEffect(() => {
		const handleBackPress = async () => {
			try {
				saveNote()
				navigation.goBack();
				
				return true;
			} catch (error) {
				console.error('API Call Failed:', error);
				return false;
			}
		};

		// 🔹 Back Button Listener Add
		const backHandler = BackHandler.addEventListener(
			'hardwareBackPress',
			handleBackPress
		);

		// 🔹 Cleanup function
		return () => {
			backHandler.remove();
		};
	}, []);

	return null; // 🔹 Kyunki ye sirf event handle karega, UI render nahi karega
};

export default NoteBackhandler;
