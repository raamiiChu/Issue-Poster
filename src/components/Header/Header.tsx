"use client";

import React from "react";
import Link from "next/link";

import GithubAuthButton from "./GithubAuthButton";
import GithubAvatar from "./GithubAvatar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 h-16 grid grid-cols-12 mx-auto px-4 sm:px-12 items-center border-b border-slate-500 backdrop-blur">
            <Link
                href={"/"}
                className="col-span-3 md:col-span-1 text-2xl font-bold hover:opacity-50 transition-all duration-500"
            >
                <h1>Home</h1>
            </Link>
            <nav className="col-start-5 sm:col-start-7 md:col-start-9 xl:col-start-11 col-span-8 sm:col-span-6 md:col-span-4 xl:col-span-2 grid grid-cols-4 items-center gap-2.5 sm:gap-5">
                <GithubAvatar />
                <ThemeToggle />
                <GithubAuthButton />
            </nav>
        </header>
    );
};

export default Header;
