// ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

const lightTheme = {
    background: '#ffffff',
    text: '#000000',
    surface: '#f2f2f2', // light gray for cards, etc.
};

const darkTheme = {
    background: '#000000',
    text: '#ffffff',
    surface: '#1e1e1e', // dark gray for cards, etc.
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const colorScheme = Appearance.getColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark');

    const toggleTheme = () => setIsDark((prev) => !prev);

    const theme = isDark ? darkTheme : lightTheme;

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setIsDark(colorScheme === 'dark');
        });
        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
