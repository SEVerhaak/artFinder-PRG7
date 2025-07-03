import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from "../components/ThemeContext";

const { width } = Dimensions.get('window');

export default function ParkDetailScreen({ route }) {
    const { park } = route.params;
    const { theme } = useContext(ThemeContext);
    const [liked, setLiked] = useState(false);

    const region = {
        latitude: park.coordinates.latitude,
        longitude: park.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const STORAGE_KEY = '@liked_park_ids';

    // Check if park is liked on mount
    useEffect(() => {
        async function checkLiked() {
            try {
                const likedIdsJson = await AsyncStorage.getItem(STORAGE_KEY);
                console.log('likedIds', likedIdsJson);
                const likedIds = likedIdsJson ? JSON.parse(likedIdsJson) : [];
                setLiked(likedIds.includes(park.ID));
            } catch (error) {
                console.error('Failed to load liked parks', error);
            }
        }
        checkLiked();
    }, [park.ID]);

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
            <Image source={{ uri: park.image_url }} style={styles.image} />
            {liked && (
                <View style={[styles.likedBox, { backgroundColor: theme.surface }]}>
                    <Text style={[styles.likedText, { color: theme.text }]}>❤️ Liked</Text>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={[styles.name, { color: theme.text }]}>{park.name}</Text>
                <Text style={[styles.description, { color: theme.text }]}>{park.description}</Text>
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
    },
    image: {
        width: width,
        height: 250,
        zIndex: 0,
    },
    likedBox: {
        position: 'absolute',
        top: 10,
        right: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 12,
        zIndex: 10,
        elevation: 10, // for Android shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    likedText: {
        fontWeight: 'bold',
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
    },
    map: {
        width: width,
        height: 300,
    },
});
