import { uid } from "uid";
import { getItem } from "../../../Utils/Storage";
import axios from "axios";

const BASE_URL = "https://notes.ceoitbox.com/api";

const ApiSaveNoteData = async (
  title,
  details,
  setTitleFn,
  setDetailsFn,
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
) => {
  // Skip saving if note is empty
  if (title === "" && details === null) {
    resetState(setBackgroundColor, setAssignTaskData);
    return Promise.resolve();
  }

  try {
    const userInfo = await getItem("userProfileInfo");
    const token = await getItem("token");

    if (!userInfo) {
      console.error("User information not available");
      return Promise.reject(new Error("User information not available"));
    }

    const noteData = createNoteData(
      title,
      details,
      userInfo,
      createNoteStar,
      createNoteMask,
      backgroundColor,
      assignTaskData,
      addCollaboratorData,
      secureNotePwd
    );

    const { data } = await axios.post(`${BASE_URL}/createNote`, noteData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

	console.log('note Data after save',data);

    if (data) {
      resetAllState(
        setTitleFn,
        setDetailsFn,
        setCreateNoteStar,
        setCreateNoteMask,
        setBackgroundColor,
        setAssignTaskData,
        setAddCollaboratorData,
        setSecureNotePwd
      );
    }

    return data;
  } catch (error) {
    console.error("Error saving note:", error);
    throw error;
  }
};

// Helper functions for better organization and readability
function createNoteData(
  title,
  details,
  userInfo,
  createNoteStar,
  createNoteMask,
  backgroundColor,
  assignTaskData,
  addCollaboratorData,
  secureNotePwd
) {
  const currentTime = new Date().toISOString();
  
  return {
    title,
    details,
    time: currentTime,
    versions: [],
    userID: userInfo?._id,
    email: userInfo?.email,
    accessTo: addCollaboratorData,
    label: [],
    password: secureNotePwd,
    type: "",
    audioLink: "",
    colors: {
      bg: backgroundColor,
      text: "rgb(0,0,0)",
    },
    typeChanged: false,
    getEmailUpdates: false,
    tasks: assignTaskData || {},
    masked: createNoteMask,
    pinned: false,
    starred: createNoteStar,
    archived: false,
    trashed: false,
    deleteDate: null,
    lastEdited: {
      _id: userInfo?._id,
      email: userInfo?.email,
      time: currentTime,
      picture: userInfo?.picture,
      seen: false,
    },
    normalReminders: [],
    locationReminders: [],
    _id: uid(25),
    creator: {
      email: userInfo?.email,
      name: userInfo?.name || userInfo?.email,
      picture: userInfo?.picture,
    },
    userPreferences: [
      {
        userID: userInfo?._id,
        email: userInfo?.email,
        starred: createNoteStar,
        pinned: false,
      },
    ],
    urls: false,
  };
}

function resetState(setBackgroundColor, setAssignTaskData) {
  setBackgroundColor("#FFF");
  setAssignTaskData("");
}

function resetAllState(
  setTitleFn,
  setDetailsFn,
  setCreateNoteStar,
  setCreateNoteMask,
  setBackgroundColor,
  setAssignTaskData,
  setAddCollaboratorData,
  setSecureNotePwd
) {
  setTitleFn("");
  setDetailsFn(null);
  setCreateNoteStar(false);
  setCreateNoteMask(false);
  setBackgroundColor("#FFF");
  setAssignTaskData("");
  setAddCollaboratorData([]);
  setSecureNotePwd("");
}

export default ApiSaveNoteData;