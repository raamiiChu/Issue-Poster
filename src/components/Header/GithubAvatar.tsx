"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";

const GithubAvatar = () => {
    const { data: session, status } = useSession();

    if (status !== "authenticated") {
        return <div className=""></div>;
    }

    const { name, image } = session.user;

    return (
        <Link
            href={`https://github.com/${name}`}
            target="_blank"
            className="relative size-9 hover:opacity-50 transition-all duration-500"
        >
            <Image
                src={image}
                fill={true}
                alt={name}
                className="rounded-full"
            />
        </Link>
    );
};

export default GithubAvatar;
