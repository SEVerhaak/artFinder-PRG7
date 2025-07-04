import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    surface: '#f2f2f2',
};

const darkTheme = {
    background: '#000000',
    text: '#ffffff',
    surface: '#1e1e1e',
};

export const ThemeContext = createContext();

const STORAGE_KEY = 'USER_THEME_PREFERENCE';

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(null); // start with null to indicate loading state

    // Load theme preference from AsyncStorage or fallback to system
    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedTheme !== null) {
                    // storedTheme is a string 'dark' or 'light'
                    setIsDark(storedTheme === 'dark');
                } else {
                    // No saved theme, use system preference
                    const systemTheme = Appearance.getColorScheme();
                    setIsDark(systemTheme === 'dark');
                }
            } catch (e) {
                console.error('Failed to load theme.');
                // fallback
                const systemTheme = Appearance.getColorScheme();
                setIsDark(systemTheme === 'dark');
            }
        };
        loadTheme();

        // Listen to system theme changes and update if no saved preference
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            // Only update if user has no saved preference (isDark === null means not loaded yet)
            // or if user preference is null? Actually, better to not override user choice.
            // So update only if no saved preference
            AsyncStorage.getItem(STORAGE_KEY).then((storedTheme) => {
                if (!storedTheme) {
                    setIsDark(colorScheme === 'dark');
                }
            });
        });

        return () => subscription.remove();
    }, []);

    // Save theme preference when toggled
    const toggleTheme = async () => {
        try {
            const newIsDark = !isDark;
            setIsDark(newIsDark);
            await AsyncStorage.setItem(STORAGE_KEY, newIsDark ? 'dark' : 'light');
        } catch (e) {
            console.error('Failed to save theme preference.');
        }
    };

    // While loading theme, you could render null or a loader
    if (isDark === null) {
        return null; // or a splash/loading screen
    }

    const theme = isDark ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
