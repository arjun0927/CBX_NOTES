import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import Footer from '../LandingPage/Footer';
import TopNavbar from './TopNavbar';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import LeftLineSvg from '../../SvgIcons/LeftLineSvg';
import RightLineSvg from '../../SvgIcons/RightLineSvg';
import { ActivityIndicator } from 'react-native-paper';
import { rMS } from '../Utils/Responsive';
import { getItem, setItem } from '../Utils/Storage';
import { useGlobalContext } from '../Context/Context';
import { signInWithGoogleFirebase, configureGoogleSignIn } from '../GoogleLogin/FirebaseConfig';

const CreateAccount = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
	const [loader, setLoader] = useState(false);
	const [googleLoader, setGoogleLoader] = useState(false);
	const { SignInWithEmailAndPassword, signInWithGoogle } = useGlobalContext();

	useEffect(() => {
		// Configure Google Sign In when component mounts
		configureGoogleSignIn();
	}, []);

	const googleLogin = async () => {
		try {
			setGoogleLoader(true);
			const response = await signInWithGoogleFirebase();
			console.log('Google sign in response:', response);
			
			if (response.user) {
				// Store user data in your preferred storage
				await setItem('token', response.token);
				await setItem('user', JSON.stringify(response.user));
				
				setGoogleLoader(false);
				navigation.navigate('HomeScreen');
			}
		} catch (error) {
			setGoogleLoader(false);
			console.error("Google Login Error:", error.message, error.code);
			Alert.alert('Error', 'Failed to sign in with Google. Please try again.');
		}
	};

	const validateInputs = () => {
		if (!email.trim()) {
			Alert.alert('Error', 'Please enter your email');
			return false;
		}
		if (!password.trim()) {
			Alert.alert('Error', 'Please enter your password');
			return false;
		}
		if (!confirmPassword.trim()) {
			Alert.alert('Error', 'Please confirm your password');
			return false;
		}
		if (password !== confirmPassword) {
			Alert.alert('Error', 'Passwords do not match');
			return false;
		}
		return true;
	};

	const login = async () => {
		if (!validateInputs()) return;

		try {
			setLoader(true);
			const userInfo = {
				email: email,
				loginWith: "EMAIL",
				password: password,
			};
			
			// Uncomment this when you have the function implemented
			// await SignInWithEmailAndPassword(userInfo);
			
			const token = await getItem('token');
			if (token) {
				setLoader(false);
				setEmail('');
				setPassword('');
				setConfirmPassword('');
				navigation.navigate('HomeScreen');
			} else {
				setLoader(false);
				Alert.alert('Error', 'Failed to create account. Please try again.');
			}
		} catch (error) {
			setLoader(false);
			console.log('Login error:', error);
			Alert.alert('Error', 'Failed to create account. Please try again.');
		}
	};

	return (
		<View style={styles.container}>
			<TopNavbar />
			<View style={styles.inputContainer}>
				{/* Email Input */}
				<View style={styles.textInputContainer}>
					<MaterialCommunityIcons name='email-outline' size={18} color={'#8F8F8F'} />
					<TextInput
						placeholder='Email'
						value={email}
						onChangeText={text => setEmail(text)}
						style={styles.textInput}
						placeholderTextColor={'#8F8F8F'}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>

				{/* Password Input */}
				<View style={styles.textInputContainer}>
					<SimpleLineIcons name='lock' size={18} color={'#8F8F8F'} />
					<TextInput
						placeholder='Password'
						value={password}
						onChangeText={text => setPassword(text)}
						style={styles.textInput}
						placeholderTextColor={'#8F8F8F'}
						secureTextEntry={!passwordVisible}
					/>
					<TouchableOpacity
						style={styles.eyeBtn}
						onPress={() => setPasswordVisible(!passwordVisible)}
					>
						{passwordVisible ? (
							<Feather name='eye' size={19} color={'#8F8F8F'} />
						) : (
							<Feather name='eye-off' size={19} color={'#8F8F8F'} />
						)}
					</TouchableOpacity>
				</View>

				{/* Confirm Password Input */}
				<View style={styles.textInputContainer}>
					<SimpleLineIcons name='lock' size={18} color={'#8F8F8F'} />
					<TextInput
						placeholder='Re-enter password'
						value={confirmPassword}
						onChangeText={text => setConfirmPassword(text)}
						style={styles.textInput}
						placeholderTextColor={'#8F8F8F'}
						secureTextEntry={!confirmPasswordVisible}
					/>
					<TouchableOpacity
						style={styles.eyeBtn}
						onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
					>
						{confirmPasswordVisible ? (
							<Feather name='eye' size={19} color={'#8F8F8F'} />
						) : (
							<Feather name='eye-off' size={19} color={'#8F8F8F'} />
						)}
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.rememberContainer}>
				<View style={styles.rememberMe}>
					<TouchableOpacity>
						<View style={styles.sqaure}></View>
					</TouchableOpacity>
					<Text style={styles.rememberMeText}>
						Remember me
					</Text>
				</View>
			</View>

			<TouchableOpacity onPress={login} activeOpacity={0.5} disabled={loader}>
				<View style={[styles.signInBtn, loader && styles.disabledBtn]}>
					{loader ? (
						<ActivityIndicator style={{ padding: rMS(14) }} size={'small'} color='white' />
					) : (
						<Text style={styles.SignInBtnText}>Create Account</Text>
					)}
				</View>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
				<View style={{ alignSelf: 'center', marginTop: 55, }}>
					<Text style={styles.accountText}>Already have an account?</Text>
				</View>
			</TouchableOpacity>

			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 5, }}>
				<LeftLineSvg />
				<Text style={{ fontSize: 14, color: '#ACACAC', fontFamily: 'Poppins-SemiBold' }}>or</Text>
				<RightLineSvg />
			</View>

			<TouchableOpacity onPress={googleLogin} disabled={googleLoader}>
				<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, gap: 2, alignItems: 'center' }}>
					{googleLoader ? (
						<ActivityIndicator size={'small'} color={'#598931'} />
					) : (
						<>
							<Image 
								style={{ width: 25, height: 25, resizeMode: 'contain', marginTop: 2, }} 
								source={require('../../assets/images/onboardImg/google.png')} 
							/>
							<Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, letterSpacing: 0.4 }}>
								Google
							</Text>
						</>
					)}
				</View>
			</TouchableOpacity>

			<View style={styles.footer}>
				<Footer />
			</View>
		</View>
	);
};

export default CreateAccount;

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
		backgroundColor: 'rgba(58, 187, 1, 0.04)',
		borderRadius: 15,
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 15,
		height: 50,
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
	rememberContainer: {
		flexDirection: 'row',
		width: '90%',
		alignSelf: 'center',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 20,
	},
	rememberMe: {
		flexDirection: 'row',
		gap: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	sqaure: {
		width: 17,
		height: 17,
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 0.5,
	},
	rememberMeText: {
		fontFamily: 'Poppins-SemiBold',
		fontSize: 12,
		color: '#8C8C8C',
		fontStyle: 'normal',
	},
	signInBtn: {
		width: '90%',
		backgroundColor: '#598931',
		borderRadius: 10,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 100,
	},
	disabledBtn: {
		opacity: 0.6,
	},
	SignInBtnText: {
		fontSize: 20,
		padding: 12,
		color: '#FFF',
		fontFamily: 'Poppins-SemiBold',
		fontWeight: '600',
		fontStyle: 'normal',
	},
	accountText: {
		fontFamily: 'Poppins-SemiBold',
		textDecorationLine: 'underline',
		color: '#598931',
		fontSize: 14,
		textDecorationStyle: 'solid',
		textDecorationColor: '#598931',
		letterSpacing: 0.4,
	},
	footer: {
		position: 'absolute',
		bottom: 20,
		alignSelf: 'center',
	},
});