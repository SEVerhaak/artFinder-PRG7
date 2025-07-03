import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';

function getDistance(lat1, lon1, lat2, lon2) {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6378137;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getBearing(lat1, lon1, lat2, lon2) {
    const toRad = (x) => (x * Math.PI) / 180;
    const toDeg = (x) => (x * 180) / Math.PI;
    const dLon = toRad(lon2 - lon1);
    const y = Math.sin(dLon) * Math.cos(toRad(lat2));
    const x =
        Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
        Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
    let brng = Math.atan2(y, x);
    brng = toDeg(brng);
    return (brng + 360) % 360;
}

export default function CompassScreen({ route }) {
    const target = route.params?.target;

    const [location, setLocation] = useState(null);
    const [heading, setHeading] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [distance, setDistance] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
        })();

        const subscription = Magnetometer.addListener((data) => {
            let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
            if (angle < 0) angle += 360;
            setHeading(angle);
        });

        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (location) {
            const dist = getDistance(
                location.latitude,
                location.longitude,
                target.latitude,
                target.longitude
            );
            setDistance(dist.toFixed(1));
        }
    }, [location]);

    const bearing = location
        ? getBearing(location.latitude, location.longitude, target.latitude, target.longitude)
        : 0;

    const rotationDegrees = bearing - heading;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compass to Target</Text>
            {errorMsg ? (
                <Text style={{ color: 'red' }}>{errorMsg}</Text>
            ) : !location ? (
                <Text>Getting location & heading...</Text>
            ) : (
                <>
                    <Animated.View
                        style={[
                            styles.compass,
                            {
                                transform: [{ rotate: `${rotationDegrees}deg` }],
                            },
                        ]}
                    >
                        <Text style={styles.arrow}>⬆️</Text>
                    </Animated.View>
                    <Text style={styles.distance}>Distance: {distance} meters</Text>
                    <Text style={styles.coords}>
                        Target: {target.latitude.toFixed(4)}, {target.longitude.toFixed(4)}
                    </Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 24,
        marginBottom: 30,
    },
    compass: {
        marginBottom: 20,
    },
    arrow: {
        fontSize: 100,
        color: 'red',
    },
    distance: {
        fontSize: 20,
        color: 'white',
        marginBottom: 8,
    },
    coords: {
        color: 'gray',
    },
});
