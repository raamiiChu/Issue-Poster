"use client";

import React from "react";
import Link from "next/link";

import GithubAuthButton from "./GithubAuthButton";
import GithubAvatar from "./GithubAvatar";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 h-16 grid grid-cols-12 px-12 items-center border-b border-slate-500 backdrop-blur">
            <Link href={"/"} className="col-span-3 text-2xl font-bold">
                <h1>Home</h1>
            </Link>
            <nav className="col-end-13 col-span-2 grid grid-cols-4 items-center gap-5">
                <GithubAvatar />
                <ThemeToggle />
                <GithubAuthButton />
            </nav>
        </header>
    );
};

export default Header;
