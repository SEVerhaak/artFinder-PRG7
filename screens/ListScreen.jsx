// screens/ParkListScreen.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import ParkList from '../components/ParkList';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.apiUrl;
export default function ParkListScreen({ navigation }) {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParks = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setParks(data.parkObject);
            } catch (error) {
                console.error('Failed to fetch parks data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParks();
    }, []);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ParkList parks={parks} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
