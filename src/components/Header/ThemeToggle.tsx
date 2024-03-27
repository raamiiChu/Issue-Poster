"use client";

import React from "react";
import { useThemeContext } from "@/context/ThemeContext";

import { CiLight } from "react-icons/ci";
import { LuMoonStar } from "react-icons/lu";

const ThemeToggle = () => {
    const { theme, setTheme } = useThemeContext();

    const switchTheme = (e: any) => {
        e.preventDefault();

        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button className="group" onClick={switchTheme}>
            {theme === "light" ? (
                <CiLight className="size-9 text-black group-hover:opacity-50 transition-all duration-500" />
            ) : (
                <LuMoonStar className="size-9 text-white group-hover:opacity-50 transition-all duration-500" />
            )}
        </button>
    );
};

export default ThemeToggle;
