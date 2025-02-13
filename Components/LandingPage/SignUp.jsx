import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Footer from '../LandingPage/Footer';
import TopNavbar from './TopNavbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import LeftLineSvg from '../../SvgIcons/LeftLineSvg';
import RightLineSvg from '../../SvgIcons/RightLineSvg';
import { signInWithGoogle, configureGoogleSignIn } from '../Utils/GoogleLogin';
import { rMS, rVS } from '../Utils/Responsive';

const SignUp = ({ navigation }) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);



	const googleLogin = async () => {
		try {
			await configureGoogleSignIn();
			await signInWithGoogle(navigation);
		} catch (error) {
			console.error("Google Login Error:", error);
		}
	};


	return (
		<View style={styles.container}>
			<TopNavbar />
			<View style={styles.inputContainer}>
				<View style={styles.textInputContainer}>
					<MaterialCommunityIcons name="email-outline" size={18} color={'#8F8F8F'} />
					<TextInput
						placeholder="Name"
						value={name}
						onChangeText={(text) => setName(text)}
						style={styles.textInput}
						placeholderTextColor={'#8F8F8F'}
					/>
				</View>

				<View style={styles.textInputContainer}>
					<SimpleLineIcons name="lock" size={18} color={'#8F8F8F'} />
					<TextInput
						placeholder="Password"
						value={password}
						onChangeText={(text) => setPassword(text)}
						style={styles.textInput}
						placeholderTextColor={'#8F8F8F'}
						secureTextEntry={!passwordVisible}
					/>
					<TouchableOpacity
						style={styles.eyeBtn}
						onPress={() => setPasswordVisible(!passwordVisible)}
					>
						{passwordVisible ? (
							<Feather name="eye" size={19} color={'#8F8F8F'} />
						) : (
							<Feather name="eye-off" size={19} color={'#8F8F8F'} />
						)}
					</TouchableOpacity>
				</View>
			</View>

			<TouchableOpacity>
				<View style={styles.signInBtn}>
					<Text style={styles.SignInBtnText}>Sign In</Text>
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
				<View style={{ alignSelf: 'center', marginTop: 55 }}>
					<Text style={styles.accountText}>Didn't have an account?</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.divider}>
				<LeftLineSvg />
				<Text style={styles.orText}>or</Text>
				<RightLineSvg />
			</View>

			{/* Google Sign-In Button */}
			<TouchableOpacity onPress={googleLogin}>
				<View style={styles.googleButton}>
					<Image style={styles.googleIcon} source={require('../../assets/images/onboardImg/google.png')} />
					<Text style={styles.googleText}>Google</Text>
				</View>
			</TouchableOpacity>

			<View style={styles.footer}>
				<Footer />
			</View>
		</View>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
	},
	inputContainer: {
		marginTop: 200,
		gap: 15,
	},
	textInputContainer: {
		width: '90%',
		borderColor: '#FAFFF9',
		borderWidth: 1,
		alignSelf: 'center',
		backgroundColor: 'rgba(57, 187, 1, 0.06)',
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: rMS(15),
		height: rVS(37),
	},
	textInput: {
		color: 'black',
		fontSize: 16,
		paddingLeft: 10,
		height: 50,
		flex: 1,
	},
	eyeBtn: {
		padding: 10,
	},
	signInBtn: {
		width: '90%',
		backgroundColor: '#598931',
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 150,
	},
	SignInBtnText: {
		fontSize: rMS(18),
		padding: rMS(10),
		color: '#FFF',
		fontFamily: 'Poppins-SemiBold',
	},
	accountText: {
		fontFamily: 'Poppins-SemiBold',
		textDecorationLine: 'underline',
		color: '#598931',
		fontSize: rMS(13),
		letterSpacing: 0.4,
	},
	divider: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: rMS(20),
		gap: 5,
	},
	orText: {
		fontSize: rMS(14),
		color: '#ACACAC',
		fontFamily: 'Poppins-SemiBold',
	},
	googleButton: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: rMS(20),
	},
	googleIcon: {
		width: rMS(30),
		height: rMS(30),
		resizeMode: 'contain',
		marginRight:3,
	},
	googleText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: rMS(20),
		letterSpacing: 0.4,
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
	},
});