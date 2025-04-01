import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from "reanimated-color-picker";
import { rMS } from "../../Utils/Responsive";

const SelectEditorBackground = ({ setEditorBackground, editorBackground, onColorChange }) => {
	const [selectedColor, setSelectedColor] = useState("#FFF");

	const onSelectColor = ({ hex }) => {
		setSelectedColor(hex);
		onColorChange(hex);
	};

	const onCencel = () => {
		// onColorChange("#FFF")
		setEditorBackground(false);
	}

	return (
		<Modal transparent={true} visible={editorBackground} animationType="fade">
			<Pressable style={styles.modalOverlay} onPress={() => setEditorBackground(false)}>
				<Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>

					<ColorPicker style={styles.colorPicker} value={selectedColor} onCompleteJS={onSelectColor}>
						<View style={styles.colorComponent}><Preview /></View>
						<View style={styles.colorComponent}><Panel1 /></View>
						<View style={styles.colorComponent}><HueSlider /></View>
						<View style={styles.colorComponent}><OpacitySlider /></View>
						<View style={styles.colorComponent}><Swatches /></View>
					</ColorPicker>

					<View style={styles.btnContainer}>
						<TouchableOpacity style={styles.btn1} onPress={onCencel}>
							<Text style={styles.btn1Text}>CANCEL</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.btn2} onPress={() => setEditorBackground(false)}>
							<Text style={styles.btn2Text}>SAVE</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
};

export default SelectEditorBackground;

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(84, 84, 84, 0.40)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContainer: {
		width: "85%",
		backgroundColor: "#fff",
		padding: rMS(20),
		borderRadius: rMS(25),
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		alignItems: "center",
	},
	title: {
		fontSize: rMS(16),
		fontWeight: "bold",
		marginBottom: rMS(15),
	},
	colorPicker: {
		width: "100%",
		alignItems: "center",
	},
	colorComponent: {
		width: "100%",
		marginVertical: rMS(8),
	},
	btnContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "60%",
		marginTop: rMS(20),
	},
	btn1: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: rMS(14),
		paddingVertical: rMS(5),
		backgroundColor: "#FFF",
		borderRadius: rMS(8),
		borderColor: "#598931",
		borderWidth: 1,
	},
	btn2: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: rMS(16),
		paddingVertical: rMS(6),
		backgroundColor: "#598931",
		borderRadius: rMS(8),
	},
	btn1Text: {
		fontFamily: "Poppins-Medium",
		fontSize: rMS(13),
		color: "#598931",
	},
	btn2Text: {
		fontFamily: "Poppins-Medium",
		fontSize: rMS(13),
		color: "#FFF",
	},
});
