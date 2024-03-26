"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import RepoCards from "@/components/RepoCards/RepoCards";

import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";
import Skeleton from "@/components/RepoCards/Skeleton";

interface Repo {
    id: number;
    name: string;
    owner: { login: string; html_url: string };
    html_url: string;
    description: string;
    created_at: string;
}

const fetcher = async (url: string, token: string) => {
    try {
        const { data, status } = await axios.get(url, {
            headers: { Authorization: `bearer ${token}` },
        });

        if (status === 200) {
            return data;
        }

        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
export default function Home() {
    const { data: session, status } = useSession();
    const [currRepo, setCurrRepo] = useState<Repo[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [canGetMoreData, setCanGetMoreData] = useState<boolean>(true);

    const {
        data: repos,
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [
            `https://api.github.com/user/repos?visibility=public&per_page=10&page=${page}`,
            session?.accessToken,
        ],
        ([url, token]) => fetcher(url, token)
    );
    console.log(session);
    console.log(repos);

    const {
        ref: mutateRef,
        inView,
        entry,
    } = useInView({
        threshold: 0,
        delay: 1000,
    });

    useEffect(() => {
        if (repos) {
            setCurrRepo((prev) => [...prev, ...repos]);

            if (repos?.length === 0) {
                setCanGetMoreData(false);
            }
        }
    }, [repos]);

    useEffect(() => {
        if (inView && canGetMoreData) {
            setPage((prev) => prev + 1);
            mutate();
        }
    }, [inView]);

    if (status === "unauthenticated") {
        return (
            <h2 className="min-h-screen col-span-full py-12 text-3xl text-center font-bold scroll-">
                Please Login First
            </h2>
        );
    }

    return (
        <main className="min-h-screen grid grid-cols-12 gap-10 px-12">
            <h1 className="col-start-2 col-span-10 mt-5 text-4xl font-bold">
                Your Repos
            </h1>

            <RepoCards repos={currRepo} />

            {error && (
                <div className="col-span-full my-12 text-3xl text-center font-bold">
                    Failed to Load Data
                </div>
            )}

            {(isLoading || isValidating) && canGetMoreData && <Skeleton />}

            {canGetMoreData ? (
                <div
                    ref={mutateRef}
                    className="col-span-full animate-spin size-12 mx-auto my-12 border-b-4 border-slate-900 dark:border-white rounded-full"
                ></div>
            ) : (
                <div className="col-span-full my-12 text-3xl text-center font-bold">
                    No More Repos
                </div>
            )}
        </main>
    );
}
