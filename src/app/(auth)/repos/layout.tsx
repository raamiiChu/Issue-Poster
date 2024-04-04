"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ReposLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { status } = useSession();

    if (status === "unauthenticated") {
        router.push("/");
    }

    return <>{children}</>;
};

export default ReposLayout;
