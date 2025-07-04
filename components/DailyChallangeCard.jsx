// components/DailyChallengeCard.js
import React, {useContext} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Bar } from 'react-native-progress';
import {ThemeContext} from "./ThemeContext";

export default function DailyChallengeCard({ progress, total, navigation }) {
    const percentage = progress / total;
    const { theme } = useContext(ThemeContext); // Get theme from context


    return (
        <View style={[styles.card, { backgroundColor: theme.surface }]}>
            <Text style={[styles.title, {color: theme.text}]}>
                <Text style={styles.bold}>Daily Challenges:</Text>{"\n"}
                Find {total} parks near you
            </Text>

            <Bar progress={percentage} width={null} height={10} color="#007bff" borderRadius={5} style={styles.progressBar} />
            <Text style={[styles.progressText, {color: theme.text}]}>{progress}/{total}</Text>
            <Button title="Open map!" onPress={() => navigation.navigate('Map')} />
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    title: { fontSize: 16, marginBottom: 10 },
    bold: { fontWeight: 'bold' },
    progressBar: { marginVertical: 10 },
    progressText: { alignSelf: 'flex-end' },
    button: { marginTop: 10 },
});
