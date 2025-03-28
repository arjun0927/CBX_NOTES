import { uid } from "uid";
import { useGlobalContext } from "../../../Context/Context";
import { getItem } from "../../../Utils/Storage";
import axios from "axios";

const ApiSaveNoteData = () => {

	const { title, setTitle, setDetails, details } = useGlobalContext();

	const userInfo = getItem('userProfileInfo');

	const noteData = () => {

		const note = {
			"title": title,
			"details": details,
			"time": "2025-03-27T07:06:34.243Z",
			"versions": [],
			"userID": userInfo?._id, // login wali 
			"email": userInfo?.email,
			"accessTo": [],
			"label": [],
			"password": "",
			"type": "",
			"audioLink": "",
			"colors": {
				"bg": "rgb(255,255,255)",
				"text": "rgb(0,0,0)"
			},
			"typeChanged": false,
			"getEmailUpdates": false,
			"tasks": {},
			"masked": false,  // eye btn related eye off and eye true
			"pinned": false,
			"starred": false,
			"archived": false,
			"trashed": false,
			"deleteDate": null,
			"lastEdited": {
				"_id": userInfo?._id,
				"email": userInfo?.email,
				"time": new Date().toISOString(),
				"picture": userInfo?.picture,
				"seen": false // default
			},
			"normalReminders": [],
			"locationReminders": [],
			"_id": uid(25),
			"creator": {
				"email": userInfo?.email,
				"name": userInfo,
				"picture": userInfo?.picture,
			},
			"userPreferences": [
				{
					"userID": userInfo?._id,
					"email": userInfo?.email,
					"starred": false,
					"pinned": false
				}
			],
			"urls": false
		}

		return note;

	};

	const saveNote = async () => {

		if (title === '' && details === null) {
			console.log('Empty note, not saving');
			return;
		}

		const apiData = noteData()
		try {
			const token = await getItem('token');
			const { data } = await axios.post('https://notes.ceoitbox.com/api/createNote', apiData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			})
			console.log('api response', data);

			// Optional: Only reset if save was successful
			if (data) {
				
				setTitle('');
				setDetails(null);  
			}

		} catch (error) {
			console.log(error);
		}
	};

	return { saveNote };
};

export default ApiSaveNoteData;
