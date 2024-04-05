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
        <button
            className="group size-9 flex justify-center items-center"
            onClick={switchTheme}
        >
            {theme === "light" ? (
                <CiLight className="text-3xl text-black group-hover:opacity-50 transition-all duration-500" />
            ) : (
                <LuMoonStar className="text-3xl text-white group-hover:opacity-50 transition-all duration-500" />
            )}
        </button>
    );
};

export default ThemeToggle;
