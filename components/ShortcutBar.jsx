import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { ThemeContext } from './ThemeContext'; // Import ThemeContext
import ClipboardIcon from './svg/clipboardIcon';
import MapIcon from './svg/mapIcon';
import SettingsIcon from './svg/settingsIcon';

export default function ShortcutBar({ navigation }) {
    const { theme } = useContext(ThemeContext); // Get theme from context

    // Map icon names to components
    const iconComponents = {
        Map: MapIcon,
        List: ClipboardIcon,      // Assuming ClipboardIcon corresponds to List
        ThemeSettings: SettingsIcon,
    };

    const shortcuts = [
        {
            route: 'Map',
            text: 'Map',
        },
        {
            route: 'List',
            text: 'List',
        },
        {
            route: 'ThemeSettings',
            text: 'Settings',
        },
    ];

    return (
        <View style={styles.row}>
            {shortcuts.map((item, index) => {
                const IconComponent = iconComponents[item.route];
                return (
                    <TouchableOpacity
                        key={index}
                        style={[styles.iconBox, { backgroundColor: theme.surface }]} // Use theme surface
                        onPress={() => navigation.navigate(item.route)}
                    >
                        <IconComponent width={50} color={"#007AFF"} />
                        <Text style={{ color: theme.text }}>{item.text}</Text>
                    </TouchableOpacity>
                );
            })}
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
});
