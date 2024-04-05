"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";

import axios from "axios";
import useSWR from "swr";

import { Issue } from "@/types";
import IssueCards from "./components/IssueCards";
import Skeleton from "./components/Skeleton";

const fetcher = async (url: string, token: string) => {
    const { data, status } = await axios.get(url, {
        headers: { Authorization: token },
    });

    if (status === 200) {
        return data as Issue[];
    }
};

const Issues = () => {
    const [page, setPage] = useState<number>(1);
    const [currIssues, setCurrIssues] = useState<Issue[] | []>([]);
    const [canGetMoreData, setCanGetMoreData] = useState<boolean>(true);

    const { data: session } = useSession();

    const {
        data: issues,
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [`/api/github/issues?page=${page}`, session?.accessToken],
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
        if (issues) {
            setCurrIssues((prev) => [...prev, ...issues]);

            if (issues?.length === 0) {
                setCanGetMoreData(false);
            }
        }
    }, [issues]);

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
            setCurrIssues([]);
        };
    }, []);

    return (
        <main className="container min-h-screen flex flex-col mx-auto px-6 sm:px-12">
            <section role="grid" className="grid grid-cols-12 gap-y-10">
                <h1 className="col-start-1 lg:col-start-2 col-span-full lg:col-span-10 mt-5 text-4xl font-bold">
                    Your Issues
                </h1>

                <Link
                    href={"/repos"}
                    className="col-start-2 md:col-start-4 lg:col-start-5 col-span-10 md:col-span-6 lg:col-span-4 px-5 py-2.5 border border-black rounded text-center font-bold bg-white text-black hover:opacity-50 dark:hover:bg-white dark:hover:text-black transition-all duration-500"
                >
                    Create an new Issue in your repos
                </Link>

                {/* error message */}
                {error && (
                    <div className="col-span-full my-12 text-3xl text-red-500 text-center font-bold">
                        Failed to Load Data
                    </div>
                )}

                {/* skeleton loading while fetching data */}
                {(isLoading || isValidating) && canGetMoreData && <Skeleton />}

                {/* show current data */}
                <IssueCards issues={currIssues} />

                {/* trigger infinite scroll, if there's more data */}
                {!error && canGetMoreData && (
                    <div
                        ref={mutateRef}
                        className="col-span-full animate-spin size-12 mx-auto my-12 border-b-4 border-slate-900 dark:border-white rounded-full"
                    />
                )}

                {!error && !canGetMoreData && (
                    <div className="col-span-full my-12 text-3xl text-center font-bold">
                        No More Issues
                    </div>
                )}
            </section>
        </main>
    );
};

export default Issues;
