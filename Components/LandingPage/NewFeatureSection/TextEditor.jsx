import React, { useRef, useEffect } from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const handleHead = ({ tintColor }) => <Text style={{ color: tintColor, fontWeight: "bold" }}>H1</Text>;

const TextEditor = () => {
	const richText = useRef(null);

	useEffect(() => {
		if (!richText) {
			console.error("RichEditor ref is not assigned!");
		} else {
			console.log("RichEditor initialized successfully!", richText);
		}
	}, []);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
					style={{ flex: 1 }}
				>
					<Text style={{ margin: 10, fontSize: 16, fontWeight: "bold" }}>Description:</Text>

					{/* <RichEditor
						androidLayerType="software"
						ref={richText}
						initialContentHTML="<p>Start writing...</p>"
						style={{ minHeight: 200, borderWidth: 1, borderColor: "#ccc", margin: 10, padding: 10 }}
						placeholder="Write something here..."
						onChange={(descriptionText) => {
							try {
								console.log("descriptionText:", descriptionText);
							} catch (error) {
								console.error("Error in onChange:", error);
							}
						}}
					/> */}
				</KeyboardAvoidingView>
			</ScrollView>

			<View style={{ borderTopWidth: 1, borderColor: "#ccc" }}>
				<RichToolbar
					editor={richText}
					actions={[
						actions.setBold,
						actions.setItalic,
						actions.insertBulletsList,
						actions.insertOrderedList,
						actions.insertLink,
						actions.keyboard,
						actions.setStrikethrough,
						actions.setUnderline,
						actions.removeFormat,
						actions.insertVideo,
						actions.checkboxList,
						actions.undo,
						actions.redo
					]}
					iconMap={{ [actions.heading1]: handleHead }}
				/>
			</View>
		</SafeAreaView>
	);
};

export default TextEditor;
