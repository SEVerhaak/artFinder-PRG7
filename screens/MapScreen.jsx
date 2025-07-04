import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from '../components/ThemeContext'; // Import ThemeContext
import Constants from 'expo-constants';
import ParkList from "../components/ParkList";

const apiUrl = Constants.expoConfig.extra.apiUrl;

function MapScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [parks, setParks] = useState([]);
    const { theme } = useContext(ThemeContext); // Get theme from context

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
            });

            try {
                console.log(apiUrl);
                const response = await fetch(`${apiUrl}`);
                const data = await response.json();
                setParks(data.parkObject || []);
            } catch (error) {
                console.error("Failed to fetch parks data:", error);
            }
        })();
    }, []);

    // Conditional rendering: show loading until location and parks data are ready
    if (!location || parks.length === 0) {
        return (
            <SafeAreaProvider>
                <View style={[styles.container, { backgroundColor: theme.surface, justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: theme.text, fontSize: 16 }}>Loading map data...</Text>
                </View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                    showsUserLocation={true}
                >
                    {parks.map((park) => (
                        <Marker
                            key={park.ID}
                            coordinate={{
                                latitude: park.coordinates.latitude,
                                longitude: park.coordinates.longitude,
                            }}
                            title={park.name}
                            description={park.description}
                            onPress={() => navigation.navigate('ParkDetail', { park })}
                        />
                    ))}
                </MapView>
                <ParkList parks={parks} navigation={navigation} />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    map: {
        width: '100%',
        height: '50%',
    },
});

export default MapScreen;
