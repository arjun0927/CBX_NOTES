import { StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react";
import SplaceLogo from "../../SvgIcons/SplaceLogo";
import Footer from "./Footer";
import { getItem } from "../Utils/Storage";

const SplaceScreen = ({ navigation }) => {

	useEffect(() => {
		const timer = setTimeout(() => {
			const token = getItem('token');
			if (token) {
				navigation.replace('HomeScreen');
			} else {
				navigation.replace('Onboard');
			}
		}, 2000);

		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<View style={styles.container}>
			<SplaceLogo width={116} height={104} />
			<View style={styles.footer}>
				<Footer />
			</View>
		</View>
	)
}

export default SplaceScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	footer: {
		position: 'absolute',
		bottom: 20,
	}
})