import React, { useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext

export default function ShortcutBar({ navigation }) {
    const { theme } = useContext(ThemeContext); // Get theme from context

    const shortcuts = [
        {
            icon: require('../assets/map.png'),
            route: 'Map',
            text: 'Map',
        },
        {
            icon: require('../assets/list.png'),
            route: 'List',
            text: 'List',
        },
        {
            icon: require('../assets/settings.png'),
            route: 'ThemeSettings',
            text: 'Settings',
        },
    ];

    return (
        <View style={styles.row}>
            {shortcuts.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.iconBox, { backgroundColor: theme.surface }]} // Use theme surface
                    onPress={() => navigation.navigate(item.route)}
                >
                    <Image source={item.icon} style={styles.icon} />
                    <Text style={{color: theme.text}}>{[item.text]}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    iconBox: {
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
    },
    icon: {
        width: 40,
        height: 40,
    },
});
