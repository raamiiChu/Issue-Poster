"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const IssuesLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { status } = useSession();

    if (status === "unauthenticated") {
        Toast.fire({
            icon: "warning",
            title: "Please Login first",
        });

        router.push("/");
    }

    return <>{children}</>;
};

export default IssuesLayout;
