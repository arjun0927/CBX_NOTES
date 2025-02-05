import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplaceScreen from "../Components/LandingPage/SplaceScreen";
import OnboardScreen from "../Components/LandingPage/OnboardScreen";
import SignUp from "../Components/LandingPage/SignUp";
import CreateAccount from "../Components/LandingPage/CreateAccount";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SplaceScreen">
				<Stack.Screen name="SplaceScreen" component={SplaceScreen} options={{headerShown:false}} />
				<Stack.Screen name="OnboardScreen" component={OnboardScreen} options={{headerShown:false}} />
				<Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}} />
				<Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown:false}} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation;