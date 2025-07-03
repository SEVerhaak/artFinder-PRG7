// screens/ThemeSettingsScreen.js
import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { ThemeContext } from '../components/ThemeContext';

const ThemeSettingsScreen = () => {
    const { isDark, toggleTheme, theme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.label, { color: theme.text }]}>Dark Mode</Text>
            <Switch
                value={isDark}
                onValueChange={toggleTheme}
                thumbColor={isDark ? '#fff' : '#000'}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ThemeSettingsScreen;
