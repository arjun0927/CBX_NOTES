import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplaceScreen from "../Components/LandingPage/SplaceScreen";
import SignUp from "../Components/LandingPage/SignUp";
import CreateAccount from "../Components/LandingPage/CreateAccount";
import Onboard from "../Components/LandingPage/Onboard";
import HomeScreen from "../Components/LandingPage/NewHeroSection/Home";
import NoteDetailScreen from "../Components/LandingPage/NewHeroSection/NoteDetailScreen";
import Stared from "../Components/LandingPage/NewHeroSection/Stared";
import Archived from "../Components/LandingPage/NewHeroSection/Archived";
import DeletedNotes from "../Components/LandingPage/NewHeroSection/DeletedNotes";
import Update from "../Components/LandingPage/NewHeroSection/Update";
import Instruction from "../Components/LandingPage/NewHeroSection/Instruction";
import Tasks from "../Components/LandingPage/NewHeroSection/Tasks";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
		
			<Stack.Navigator initialRouteName="SplaceScreen">
				<Stack.Screen name="SplaceScreen" component={SplaceScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }} />
				<Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
				<Stack.Screen name="CreateAccount" component={CreateAccount} options={{ headerShown: false }} />
				<Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Stared" component={Stared} options={{ headerShown: false }} />
				<Stack.Screen name="Archived" component={Archived} options={{ headerShown: false }} />
				<Stack.Screen name="DeletedNotes" component={DeletedNotes} options={{ headerShown: false }} />
				<Stack.Screen name="Update" component={Update} options={{ headerShown: false }} />
				<Stack.Screen name="Instruction" component={Instruction} options={{ headerShown: false }} />
				<Stack.Screen name="Tasks" component={Tasks} options={{ headerShown: false }} />

			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigation;