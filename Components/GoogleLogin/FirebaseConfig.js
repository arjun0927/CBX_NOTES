import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const configureGoogleSignIn = () => {
	GoogleSignin.configure({
		webClientId: '27653541181-p8crb3btitsjlrlc2v6gj5ran7qkvtjt.apps.googleusercontent.com',
		offlineAccess: true,
		hostedDomain: '', // specify a domain if you want to restrict to a specific domain
		forceCodeForRefreshToken: true,
		accountName: '', // specifies an account name on the device that should be used
	});
};

export const signInWithGoogleFirebase = async () => {
	try {
		// Check if device supports Google Play Services
		await GoogleSignin.hasPlayServices();

		// Get the users ID token
		const signInResult = await GoogleSignin.signIn();
		
		console.log('Sign in result:', signInResult);

		// Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(signInResult.idToken);

		// Sign in with the credential
		const result = await auth().signInWithCredential(googleCredential);
		
		return {
			user: result.user,
			token: signInResult.idToken,
		};
	} catch (error) {
		console.error("Google Sign In Error:", error);
		
		if (error.code === statusCodes.SIGN_IN_CANCELLED) {
			console.log('User cancelled the login flow');
		} else if (error.code === statusCodes.IN_PROGRESS) {
			console.log('Signing in');
		} else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.log('Play services not available');
		} else {
			console.log('Some other error happened');
		}
		
		throw error;
	}
};

export const signOutGoogle = async () => {
	try {
		await GoogleSignin.revokeAccess();
		await GoogleSignin.signOut();
		await auth().signOut();
	} catch (error) {
		console.error("Sign Out Error:", error);
		throw error;
	}
};