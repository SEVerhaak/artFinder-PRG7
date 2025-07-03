// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from './components/ThemeContext'; // Import your ThemeProvider

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ThemeSettingsScreen from "./screens/ThemeSettings";
import ParkListScreen from "./screens/ListScreen";
import ParkDetailScreen from "./screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Map" component={MapScreen} />
                    <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
                    <Stack.Screen name="List" component={ParkListScreen} />
                    <Stack.Screen name="ParkDetail" component={ParkDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}
