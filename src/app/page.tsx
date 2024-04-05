"use client";
import React from "react";
import Link from "next/link";

import { useSession, signIn } from "next-auth/react";

export default function Home() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <main className="container min-h-screen mx-auto py-12 space-y-6">
                <h2 className="text-3xl text-center font-bold ">Loading...</h2>
                <div className="col-span-full animate-spin size-12 mx-auto my-12 border-b-4 border-slate-900 dark:border-white rounded-full"></div>
            </main>
        );
    }

    if (status === "unauthenticated") {
        return (
            <main className="container min-h-screen mx-auto py-12 space-y-6">
                <h2 className="text-3xl text-center font-bold ">
                    Please Login First
                </h2>

                <button
                    className="block px-12 py-3 mx-auto border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                    onClick={() => {
                        signIn("github");
                    }}
                >
                    Login
                </button>
            </main>
        );
    }

    return (
        <main className="container min-h-screen mx-auto space-y-12 py-6 text-center">
            <h1 className="text-3xl font-bold leading-normal">
                Welcome! {JSON.stringify(session?.user?.name || "Unknown")}
            </h1>

            <nav className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-8 py-3">
                <Link
                    href={"/repos"}
                    className="px-12 py-3 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                >
                    See your Repos
                </Link>

                <Link
                    href={"/issues"}
                    className="px-12 py-3 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                >
                    See your Issues
                </Link>
            </nav>
        </main>
    );
}
