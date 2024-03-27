"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Issues = () => {
    const router = useRouter();
    const { status } = useSession();

    if (status === "loading") {
        return <p className="min-h-screen">Loading...</p>;
    }

    if (status === "unauthenticated") {
        router.push("/");
    }
};

export default Issues;
