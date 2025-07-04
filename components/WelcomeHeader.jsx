import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext
export default function WelcomeHeader({ username }) {
    const { theme } = useContext(ThemeContext); // Get theme from context

    return (
        <View style={[styles.container, {color: theme.text}]}>
            <Text style={[styles.welcome, {color: theme.text}]}>
                Welcome <Text style={[styles.username,  {color: theme.text}]}>{username}</Text>,
            </Text>
            <Text style={[styles.sub,  {color: theme.text}]}>Let’s find some parks today!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    welcome: { fontSize: 20 },
    username: { fontWeight: 'bold' },
    sub: { fontSize: 16, color: '#555' },
});
