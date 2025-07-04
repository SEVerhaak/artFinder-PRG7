import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FavouriteCard from './FavouriteCards';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useFocusEffect } from '@react-navigation/native'; // Add this
const apiUrl = Constants.expoConfig.extra.apiUrl;
const STORAGE_KEY = '@liked_park_ids';

export default function FavouriteCardList(navigation) {
    const [likedIds, setLikedIds] = useState([]);
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load liked park IDs (called on screen focus)
    const loadLikedIds = async () => {
        try {
            const saved = await AsyncStorage.getItem(STORAGE_KEY);
            if (saved !== null) {
                setLikedIds(JSON.parse(saved));
            } else {
                setLikedIds([]);
            }
        } catch (e) {
            console.error('Failed to load liked IDs', e);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadLikedIds();
        }, [])
    );

    // Fetch all parks once on mount
    useEffect(() => {
        const fetchParks = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setParks(data.parkObject || []);
            } catch (error) {
                console.error('Failed to fetch parks data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParks();
    }, []);

    const likedParks = parks.filter(park => likedIds.includes(park.ID)).slice(0, 2); // limit to 2

    if (loading) {
        return (
            <View style={styles.row}>
                <Text>Loading favourites...</Text>
            </View>
        );
    }

    if (likedParks.length === 0) {
        return (
            <View style={styles.row}>
                <Text style={styles.message}>No favourite parks yet 😔</Text>
            </View>
        );
    }

    return (
        <View style={styles.row}>
            {likedParks.map((park) => (
                <FavouriteCard
                    key={park.ID}
                    title={park.name}
                    image={{ uri: park.image_url }}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 16,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});
