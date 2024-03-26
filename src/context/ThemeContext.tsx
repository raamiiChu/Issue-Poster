"use client";

import { createContext, useState, useContext } from "react";

type Theme = "dark" | "light";

type ThemeContext = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = createContext<ThemeContext | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={`${theme} theme`}>{children}</div>
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            "useThemeContext must be used within a ThemeContextProvider"
        );
    }

    return context;
}
