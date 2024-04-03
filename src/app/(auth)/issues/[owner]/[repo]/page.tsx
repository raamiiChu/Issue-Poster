"use client";

import React, { useState } from "react";
import Link from "next/link";
import { IssuePageParams, Issue } from "@/types";

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import Markdown from "react-markdown";

import { BsBoxArrowUpRight } from "react-icons/bs";
import { format } from "date-fns";

type Params = {
    params: IssuePageParams;
};

const fetcher = async (url: string, token: string) => {
    const { data, status } = await axios.get(url, {
        headers: { Authorization: token },
    });

    if (status === 200) {
        return data as Issue[];
    }

    return [];
};

const IssuePage = ({ params }: Params) => {
    const { owner, repo } = params;
    const { data: session } = useSession();

    const {
        data: issues,
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [
            `/api/github/issues/${owner}/${repo}?page=${1}`,
            // `https://api.github.com/repos/${owner}/${repo}/issues?per_page=10&page=1`,
            session?.accessToken,
        ],
        ([url, token]) => fetcher(url, token)
    );

    return (
        <main className="container min-h-screen grid grid-cols-12 gap-10 mx-auto px-12 pt-4 pb-16">
            <h1 className="col-start-2 col-span-10 mt-5 text-4xl font-bold">
                Issues in {repo}
            </h1>

            {issues?.length === 0 && (
                <article className="col-span-full space-y-5 text-center">
                    <h2 className="text-3xl">
                        Oops, there&apos;s no issues in this repo.
                    </h2>
                    <p className="text-xl">You can post a new issue.</p>
                </article>
            )}

            <button className="h-fit col-start-6 col-span-2 px-5 py-2.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500">
                Post an Issue
            </button>

            <section className="h-fit col-start-2 col-span-10 grid grid-cols-12 gap-x-10 gap-y-16">
                {issues?.map((issue) => {
                    const {
                        id,
                        number,
                        html_url,
                        title,
                        body,
                        comments,
                        comments_url,
                    } = issue;

                    return (
                        <article
                            key={id}
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
                                    target="blank"
                                >
                                    <BsBoxArrowUpRight className="text-black dark:text-white hover:opacity-50 transition-all" />
                                </Link>

                                <span className="col-span-2 text-center">
                                    # {number}
                                </span>
                            </section>

                            <button className="h-fit px-5 py-1.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 transition-all duration-500">
                                Comments: {comments}
                            </button>

                            {/* <div className="mx-auto prose prose-init prose-stone dark:prose-invert">
                                <Markdown>{body}</Markdown>
                            </div> */}
                        </article>
                    );
                })}
            </section>
        </main>
    );
};

export default IssuePage;
