import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';

const AddFields = () => {
	const snapPoints = useMemo(() => ['25%', '50%', '70%'], []);

	const bottomSheetRef = useRef(null);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.container}>
				<BottomSheet
					ref={bottomSheetRef}
					index={2}
					snapPoints={snapPoints}
					enablePanDownToClose={true}
				>
					<Text style={styles.text}>Add Fields</Text>
				</BottomSheet>
			</View>
		</GestureHandlerRootView>
	);
};

export default AddFields;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentContainer: {
		flex: 1,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		color: 'red',
		fontSize: 18,
		fontWeight: 'bold',
	},
});
