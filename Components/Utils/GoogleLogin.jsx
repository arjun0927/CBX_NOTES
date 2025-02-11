import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { setItem } from './Storage';

// Configure Google Sign-In
export const configureGoogleSignIn = () => {
    GoogleSignin.configure({
        webClientId: '586907532420-51eo3o1fgcb3tcuh8e06nlrlsooa77op.apps.googleusercontent.com',
        scopes: ['profile', 'email', 'openid'],
        offlineAccess: true,
    });
};

// Function to handle Google Sign-In
export const signInWithGoogle = async (navigation) => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();

        const { idToken, serverAuthCode, user } = userInfo.data;

        const data = {
            idToken,
            scopes: [
                "https://www.googleapis.com/auth/userinfo.profile",
                "https://www.googleapis.com/auth/userinfo.email",
                "openid",
                "profile",
                "email"
            ],
            serverAuthCode,
            user: {
                email: user.email,
                familyName: user.familyName,
                givenName: user.givenName,
                id: user.id,
                name: user.name,
                photo: user.photo
            }
        };

        console.log('42 userin', userInfo.data)

        // Send data to backend API
        const response = await axios.post('https://notes.ceoitbox.com/api/signin/mobile', data);

        if (response?.data?.token) {
            setItem('token', response?.data?.token); // Store token using MMKV
            navigation.navigate('HomeScreen');
        }
    } catch (error) {
        console.error('Google login error:', error);
    }
};
