// screens/ParkDetailScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

export default function ParkDetailScreen({ route }) {
    const { park } = route.params;

    const region = {
        latitude: park.coordinates.latitude,
        longitude: park.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: park.image_url }} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{park.name}</Text>
                <Text style={styles.description}>{park.description}</Text>
            </View>
            <MapView style={styles.map} initialRegion={region}>
                <Marker
                    coordinate={{
                        latitude: park.coordinates.latitude,
                        longitude: park.coordinates.longitude,
                    }}
                    title={park.name}
                    description={park.description}
                />
            </MapView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: width,
        height: 250,
    },
    textContainer: {
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#555',
    },
    map: {
        width: width,
        height: 300,
    },
});
