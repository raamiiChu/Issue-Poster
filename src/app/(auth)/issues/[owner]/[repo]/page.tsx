"use client";

import React from "react";
import Link from "next/link";
import { IssuePageParams, Issue } from "@/types";

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { BsBoxArrowUpRight } from "react-icons/bs";

const fetcher = async (url: string, token: string) => {
    const { data, status } = await axios.get(url, {
        headers: { Authorization: token },
    });

    if (status === 200) {
        return data as Issue[];
    }
};

const IssuePage = ({ params }: IssuePageParams) => {
    const { owner, repo } = params;
    const { data: session } = useSession();

    const {
        data: issues,
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [`/api/github/issues/${owner}/${repo}?page=${1}`, session?.accessToken],
        ([url, token]) => fetcher(url, token)
    );

    return (
        <main className="container min-h-screen mx-auto px-12 pt-4 pb-16">
            <section role="grid" className="grid grid-cols-12 gap-y-10">
                <h1 className="col-start-2 col-span-10 mt-5 text-4xl font-bold">
                    Issues in &quot;{repo}&quot;
                </h1>

                {issues?.length === 0 && (
                    <article className="col-span-full space-y-5 text-center">
                        <h2 className="text-3xl">
                            Oops, there&apos;s no issues in this repo.
                        </h2>
                        <p className="text-xl">You can post a new issue.</p>
                    </article>
                )}

                <Link
                    href={"/"}
                    role="button"
                    className="fixed top-20 left-10 px-5 py-1.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                >
                    Go Back
                </Link>

                <button
                    role="button"
                    className="col-start-6 col-span-2 px-5 py-2.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                >
                    Post an Issue
                </button>

                <section
                    role="grid"
                    className="col-start-2 col-span-10 grid grid-cols-12 gap-x-10 gap-y-16"
                >
                    {issues?.map((issue) => {
                        const { id, number, html_url, title, comments } = issue;

                        return (
                            <article
                                key={id}
                                role="gridcell"
                                className="col-span-4 flex flex-col justify-between gap-y-5 p-6 border-2 rounded border-black dark:border-white"
                            >
                                <section className="grid grid-cols-12 justify-between items-center gap-x-4">
                                    <Link
                                        className="col-span-8"
                                        href={`/issues/${owner}/${repo}/${number}`}
                                    >
                                        <h2
                                            title={title}
                                            className="text-2xl font-bold line-clamp-2 underline-offset-2 hover:underline transition-all"
                                        >
                                            {title}
                                        </h2>
                                    </Link>

                                    <Link
                                        className="col-span-2 flex items-center text-2xl"
                                        href={html_url}
                                        target="_blank"
                                    >
                                        <BsBoxArrowUpRight className="text-black dark:text-white hover:opacity-50 transition-all" />
                                    </Link>

                                    <span className="col-span-2 text-center">
                                        # {number}
                                    </span>
                                </section>

                                <Link
                                    href={`/issues/${owner}/${repo}/${number}#comments`}
                                    className="px-5 py-1.5 border border-black rounded bg-white text-black text-center font-bold hover:opacity-50 transition-all duration-500"
                                >
                                    Comments: {comments}
                                </Link>
                            </article>
                        );
                    })}
                </section>
            </section>
        </main>
    );
};

export default IssuePage;
