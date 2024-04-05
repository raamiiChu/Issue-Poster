"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import axios from "axios";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useInView } from "react-intersection-observer";

import { IssuePageParams, Issue } from "@/types";

import PostIssueModal from "./components/PostIssueModal";
import IssueCards from "./components/IssueCards";
import Skeleton from "./components/Skeleton";

const fetcher = async (url: string, token: string) => {
    try {
        const { data, status } = await axios.get(url, {
            headers: { Authorization: token },
        });

        if (status === 200) {
            return data as Issue[];
        }
    } catch (error: any) {
        console.log(error.response);
        return [];
    }
};

const IssuePage = ({ params }: IssuePageParams) => {
    const { owner, repo } = params;
    const { data: session } = useSession();

    const [page, setPage] = useState<number>(1);
    const [currIssues, setCurrIssues] = useState<Issue[] | []>([]);
    const [canGetMoreData, setCanGetMoreData] = useState<boolean>(true);

    const {
        data: issues,
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [
            `/api/github/issues/${owner}/${repo}?page=${page}`,
            session?.accessToken,
        ],
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
        <main className="container min-h-screen mx-auto px-6 sm:px-12 py-16">
            <section role="grid" className="grid grid-cols-12 gap-y-10">
                <Link
                    href={"/repos"}
                    role="button"
                    className="fixed top-20 left-3 sm:left-10 px-5 py-1.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                >
                    Go Back
                </Link>

                <h1 className="col-start-2 col-span-10 mt-5 text-4xl font-bold">
                    Issues in {JSON.stringify(repo)}
                </h1>

                <PostIssueModal params={params} />

                {/* error message */}
                {error && (
                    <div className="col-span-full my-12 text-3xl text-red-500 text-center font-bold">
                        Failed to Load Data
                    </div>
                )}

                {!(isLoading || isValidating) && currIssues?.length === 0 && (
                    <article className="col-span-full space-y-5 text-center">
                        <h2 className="text-3xl">
                            Oops, there&apos;s no issues in this repo.
                        </h2>
                        <p className="text-xl">You can post a new issue.</p>
                    </article>
                )}

                {/* skeleton loading while fetching data */}
                {(isLoading || isValidating) && canGetMoreData && <Skeleton />}

                {/* show current data */}
                <IssueCards issues={currIssues} owner={owner} repo={repo} />

                {/* trigger infinite scroll, if there's more data */}
                {!error && canGetMoreData && (
                    <div
                        ref={mutateRef}
                        className="col-span-full animate-spin size-12 mx-auto my-12 border-b-4 border-slate-900 dark:border-white rounded-full"
                    />
                )}

                {!error && !canGetMoreData && currIssues?.length !== 0 && (
                    <div className="col-span-full my-12 text-3xl text-center font-bold">
                        No More Issues
                    </div>
                )}
            </section>
        </main>
    );
};

export default IssuePage;
