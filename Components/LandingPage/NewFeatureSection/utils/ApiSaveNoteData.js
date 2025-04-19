import { uid } from "uid";
import { getItem } from "../../../Utils/Storage";
import axios from "axios";

const ApiSaveNoteData = async (title, details, setTitleFn, setDetailsFn , createNoteStar, setCreateNoteStar, createNoteMask, setCreateNoteMask, backgroundColor, setBackgroundColor, assignTaskData, setAssignTaskData, addCollaboratorData, setAddCollaboratorData ) => {

	// console.log('assign Task data ', assignTaskData)
	const userInfo = getItem('userProfileInfo');
	const note = {
		"title": title,
		"details": details,
		"time": new Date().toISOString(),
		"versions": [],
		"userID": userInfo?._id,
		"email": userInfo?.email,
		"accessTo": addCollaboratorData,
		"label": [],
		"password": "",
		"type": "",
		"audioLink": "",
		"colors": {
			"bg": backgroundColor,
			"text": "rgb(0,0,0)"
		},
		"typeChanged": false,
		"getEmailUpdates": false,
		"tasks": { ...assignTaskData },
		"masked": createNoteMask,
		"pinned": false,
		"starred": createNoteStar,
		"archived": false,
		"trashed": false,
		"deleteDate": null,
		"lastEdited": {
			"_id": userInfo?._id,
			"email": userInfo?.email,
			"time": new Date().toISOString(),
			"picture": userInfo?.picture,
			"seen": false
		},
		"normalReminders": [],
		"locationReminders": [],
		"_id": uid(25),
		"creator": {
			"email": userInfo?.email,
			"name": userInfo?.name || userInfo?.email,
			"picture": userInfo?.picture,
		},
		"userPreferences": [
			{
				"userID": userInfo?._id,
				"email": userInfo?.email,
				"starred": createNoteStar,
				"pinned": false
			}
		],
		"urls": false
	};

	if (title === '' && details === null) {
		// console.log('Empty note, not saving');
		setBackgroundColor('#FFF');
		setAssignTaskData('')
		return Promise.resolve();
	  }
	try {
		console.log('note',note)
		const token = await getItem('token');
		const { data } = await axios.post('https://notes.ceoitbox.com/api/createNote', note, {
		  headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		  },
		});
		// console.log('api response', data);
	
		if (data) {
		  setTitleFn('');
		  setDetailsFn(null);
		  setCreateNoteStar(false);
		  setCreateNoteMask(false);
		  setBackgroundColor('#FFF');
		  setAssignTaskData('');
		  setAddCollaboratorData([]);
		}
	  } catch (error) {
		console.log(error);
		// throw error;
	  }
};


export default ApiSaveNoteData;