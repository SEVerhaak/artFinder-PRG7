// components/ParkList.js
import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from './ThemeContext';

const STORAGE_KEY = '@liked_park_ids';

export default function ParkList({ parks, navigation }) {
    const { theme } = useContext(ThemeContext);
    const [likedIds, setLikedIds] = useState([]);

    // Load liked IDs from storage on mount
    useEffect(() => {
        (async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved !== null) {
                    setLikedIds(JSON.parse(saved));
                }
            } catch (e) {
                console.error('Failed to load liked IDs', e);
            }
        })();
    }, []);

    // Save liked IDs when they change
    useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(likedIds));
            } catch (e) {
                console.error('Failed to save liked IDs', e);
            }
        })();
    }, [likedIds]);

    const toggleLike = (id) => {
        setLikedIds((current) =>
            current.includes(id) ? current.filter((likedId) => likedId !== id) : [...current, id]
        );
    };

    const renderItem = ({ item }) => {
        const isLiked = likedIds.includes(item.ID);

        return (
            <TouchableOpacity
                style={[styles.card, { backgroundColor: theme.surface }]}
                onPress={() => navigation.navigate('ParkDetail', { park: item })}
            >
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
                    <Text style={[styles.description, { color: theme.text }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => toggleLike(item.ID)}
                    style={[styles.likeButton, { borderColor: theme.text }]}
                >
                    <Text style={{ color: isLiked ? 'red' : theme.text, fontWeight: 'bold' }}>
                        {isLiked ? '♥ Liked' : '♡ Like'}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={parks}
            keyExtractor={(item) => item.ID.toString()}
            renderItem={renderItem}
            contentContainerStyle={[styles.listContainer, { backgroundColor: theme.background }]}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: '#f0f0f0',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
    },
    textContainer: {
        padding: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    likeButton: {
        borderWidth: 1,
        borderRadius: 20,
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginHorizontal: 12,
    },
});
