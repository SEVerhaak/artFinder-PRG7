import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';
import {useState, useEffect, useContext} from "react";
import { ThemeContext } from '../components/ThemeContext'; // Import ThemeContext


function MapScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [parks, setParks] = useState([]);
    const { theme } = useContext(ThemeContext); // Get theme from context


    useEffect(() => {
        (async () => {
            // Request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            // Get user location and set as initial region center
            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
            });

            // Fetch parks data from your API
            try {
                const response = await fetch('http://145.137.59.177:8001/parks');
                const data = await response.json();
                // Assuming the parks are in data.result
                setParks(data.parkObject);
                console.log(data.parkObject[0].coordinates.latitude);
            } catch (error) {
                console.error("Failed to fetch parks data:", error);
            }
        })();
    }, []);

    const markers = [];
    parks.forEach((park) => {
        markers.push(
            <Marker
                key={park.ID}
                coordinate={{
                    latitude: park.coordinates.latitude,
                    longitude: park.coordinates.longitude,
                }}
                title={park.name}
                description={park.description}
            />
        );
    });

    return (
        <SafeAreaProvider>
            <View style={[styles.container, {backgroundColor: theme.surface }]}>
                <MapView
                    style={styles.map}
                    initialRegion={location ? {
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    } : undefined}
                    showsUserLocation={true}
                >
                    {markers}
                </MapView>
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
        height: '80%',
    },
});

export default MapScreen;
