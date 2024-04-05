"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

import RepoCards from "./components/RepoCards";
import Skeleton from "./components/Skeleton";
import { Repo } from "@/types";

const fetcher = async (url: string, token: string | undefined) => {
    const { data, status } = await axios.get(url, {
        headers: { Authorization: token },
    });

    if (status === 200) {
        return data;
    }
};

const Repos = () => {
    const [currRepos, setCurrRepos] = useState<Repo[] | []>([]);
    const [page, setPage] = useState<number>(1);
    const [canGetMoreData, setCanGetMoreData] = useState<boolean>(true);

    const { data: session } = useSession();

    const {
        data: repos,
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [`/api/github/repos?page=${page}`, session?.accessToken],
        ([url, token]) => fetcher(url, token)
    );

    // infinite scroll
    const {
        ref: mutateRef,
        inView,
        entry,
    } = useInView({
        threshold: 0,
        delay: 1000,
    });

    useEffect(() => {
        // add new repos
        if (repos) {
            setCurrRepos((prev) => [...prev, ...repos]);

            if (repos?.length === 0) {
                setCanGetMoreData(false);
            }
        }
    }, [repos]);

    useEffect(() => {
        // trigger infintie scroll
        if (inView && canGetMoreData) {
            setPage((prev) => prev + 1);
            mutate();
        }
    }, [inView]);

    useEffect(() => {
        // Clear currRepos when component unmounts
        return () => {
            setCurrRepos([]);
        };
    }, []);

    return (
        <main className="container min-h-screen flex flex-col mx-auto px-6 sm:px-12">
            <section role="grid" className="grid grid-cols-12 gap-y-10">
                <h1 className="col-start-1 lg:col-start-2 col-span-full lg:col-span-10 mt-5 text-4xl font-bold">
                    Your Repos
                </h1>

                {/* error message */}
                {error && (
                    <div className="col-span-full my-12 text-3xl text-red-500 text-center font-bold">
                        Failed to Load Data
                    </div>
                )}

                {/* skeleton loading while fetching data */}
                {(isLoading || isValidating) && canGetMoreData && <Skeleton />}

                {/* show current data */}
                <RepoCards repos={currRepos} />

                {/* trigger infinite scroll, if there's more data */}
                {!error && canGetMoreData && (
                    <div
                        ref={mutateRef}
                        className="col-span-full animate-spin size-12 mx-auto my-12 border-b-4 border-slate-900 dark:border-white rounded-full"
                    />
                )}

                {!error && !canGetMoreData && (
                    <div className="col-span-full my-12 text-3xl text-center font-bold">
                        No More Repos
                    </div>
                )}
            </section>
        </main>
    );
};

export default Repos;
