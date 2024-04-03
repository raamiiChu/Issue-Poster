"use client";

import React from "react";
import Link from "next/link";

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { IssueNumberPageParams, Issue } from "@/types";

import Markdown from "react-markdown";
import { BsBoxArrowUpRight } from "react-icons/bs";

const fetcher = async (url: string, token: string) => {
    const { data, status } = await axios.get(url, {
        headers: { Authorization: token },
    });

    if (status === 200) {
        return data as Issue;
    }
};

const IssueBody = ({ params }: IssueNumberPageParams) => {
    const { owner, repo, number } = params;
    const { data: session } = useSession();

    const {
        data: issue,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [`/api/github/issues/${owner}/${repo}/${number}`, session?.accessToken],
        ([url, token]) => fetcher(url, token)
    );

    return (
        <article role="article" className="col-start-4 col-span-6 space-y-10">
            <Link
                href={issue?.html_url || "/"}
                target="_blank"
                className="group relative"
            >
                <h1
                    title={issue?.title}
                    className="text-4xl text-center text-blue-500 font-bold line-clamp-2 transition-all group-hover:underline"
                >
                    {issue?.title}
                </h1>
                <BsBoxArrowUpRight className="hidden absolute top-1 right-5 transition-all group-hover:block" />
            </Link>

            <hr className="border-4" />

            <p className="mx-auto prose prose-init prose-stone dark:prose-invert">
                <Markdown>{issue?.body}</Markdown>
            </p>
        </article>
    );
};

export default IssueBody;
