"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const GithubAuthButton = () => {
    const router = useRouter();
    const { status } = useSession();

    if (status === "loading") {
        return (
            <button
                disabled
                className="col-span-2 px-5 py-1.5 border border-black rounded bg-white opacity-30 text-black font-bold hover:cursor-not-allowed"
            >
                Loading
            </button>
        );
    }

    if (status === "authenticated") {
        return (
            <button
                className="col-span-2 px-5 py-1.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                onClick={() => {
                    router.push("/");
                    signOut();
                }}
            >
                Logout
            </button>
        );
    }

    return (
        <button
            className="col-span-2 px-5 py-1.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
            onClick={() => {
                signIn("github");
            }}
        >
            Login
        </button>
    );
};

export default GithubAuthButton;
