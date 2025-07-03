import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, ThemeContext } from './components/ThemeContext';

import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ThemeSettingsScreen from "./screens/ThemeSettings";
import ParkListScreen from "./screens/ListScreen";
import ParkDetailScreen from "./screens/DetailScreen";
import CompassScreen from "./screens/CompassScreen";

const Stack = createNativeStackNavigator();

function Navigator() {
    const { theme } = useContext(ThemeContext);

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: true,
                    headerTintColor: '#007AFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerStyle: {
                        backgroundColor: theme.surface,
                    },
                    headerBackTitleVisible: false,
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Map" component={MapScreen} />
                <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
                <Stack.Screen name="List" component={ParkListScreen} />
                <Stack.Screen name="ParkDetail" component={ParkDetailScreen} />
                <Stack.Screen name="Compass" component={CompassScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <Navigator />
        </ThemeProvider>
    );
}
