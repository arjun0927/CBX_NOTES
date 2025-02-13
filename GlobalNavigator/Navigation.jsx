import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplaceScreen from "../Components/LandingPage/SplaceScreen";
import OnboardScreen from "../Components/LandingPage/OnboardScreen";
import SignUp from "../Components/LandingPage/SignUp";
import CreateAccount from "../Components/LandingPage/CreateAccount";
import Onboard from "../Components/LandingPage/Onboard";
import HomeScreen from "../Components/LandingPage/NewHeroSection/Home";
<<<<<<< HEAD
import NoteDetailScreen from "../Components/LandingPage/NewHeroSection/NoteDetailScreen";
// import HomeScreen from "../Components/LandingPage/HomeScreen";
=======
>>>>>>> 392cf6455675ffd8b51477a1e3716a7f9a604015

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
		
			<Stack.Navigator initialRouteName="SplaceScreen">
				<Stack.Screen name="SplaceScreen" component={SplaceScreen} options={{ headerShown: false }} />
				<Stack.Screen name="OnboardScreen" component={OnboardScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }} />
				<Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
				<Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
				<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} options={{ headerShown: false }} />

			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation;