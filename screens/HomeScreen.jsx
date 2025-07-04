// screens/HomeScreen.js
import React, { useContext } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import WelcomeHeader from '../components/WelcomeHeader';
import DailyChallengeCard from '../components/DailyChallangeCard';
import FavouriteCardList from '../components/FavouriteCardList';
import ShortcutBar from '../components/ShortcutBar';
import { ThemeContext } from '../components/ThemeContext'; // Import ThemeContext

export default function HomeScreen({ navigation }) {
    const { theme } = useContext(ThemeContext); // Access current theme

    return (
        <View style={{ flex: 1, backgroundColor: theme.background }}>
            <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
                <WelcomeHeader username={"USER"} />
                <DailyChallengeCard progress={2} total={3} navigation={navigation} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Favourites</Text>
                <FavouriteCardList navigation={navigation} />
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Shortcuts</Text>
                <ShortcutBar navigation={navigation} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});
