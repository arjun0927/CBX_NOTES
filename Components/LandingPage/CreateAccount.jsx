import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Footer from '../LandingPage/Footer';
import TopNavbar from './TopNavbar';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Feather from 'react-native-vector-icons/dist/Feather';
import LeftLineSvg from '../../SvgIcons/LeftLineSvg';
import RightLineSvg from '../../SvgIcons/RightLineSvg';
import { configureGoogleSignIn, signInWithGoogle } from '../Utils/GoogleLogin';

const CreateAccount = ({navigation}) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
				{/* Name Input */}
				<View style={styles.textInputContainer}>
					<MaterialCommunityIcons name='email-outline' size={18} color={'#8F8F8F'} />
					<TextInput
						placeholder='Name'
						value={name}
						onChangeText={text => setName(text)}
						style={styles.textInput}
						placeholderTextColor={'#8F8F8F'}
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
			<TouchableOpacity>
				<View style={styles.signInBtn}>
					<Text style={styles.SignInBtnText}>Sign In</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>navigation.navigate('SignUp')}>
				<View style={{ alignSelf: 'center', marginTop: 55, }}>
					<Text style={styles.accountText}>Already have an account?</Text>
				</View>
			</TouchableOpacity>

			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, gap: 5, }}>
				<LeftLineSvg />
				<Text style={{ fontSize: 14, color: '#ACACAC', fontFamily: 'Poppins-SemiBold' }}>or</Text>
				<RightLineSvg />
			</View>
			<TouchableOpacity  onPress={googleLogin}>
				<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, gap: 2, }}>
					<Image style={{ width: 25, height: 25, resizeMode: 'contain', marginTop: 2, }} source={require('../../assets/images/onboardImg/google.png')} />
					<Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 20, letterSpacing: 0.4 }}>Google</Text>
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
	forgetPasswordText: {
		fontFamily: 'Poppins-Medium',
		fontSize: 12,
		color: '#598931',
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
