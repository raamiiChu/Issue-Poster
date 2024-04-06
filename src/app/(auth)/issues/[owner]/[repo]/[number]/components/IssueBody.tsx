"use client";

import React from "react";
import Link from "next/link";

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { IssueNumberPageParams, Issue } from "@/types";

import Markdown from "react-markdown";

import UpdateIssueModal from "./UpdateIssueModal";
import DeleteIssueButton from "./DeleteIssueButton";
import IssueBodySkeleton from "./IssueBodySkeleton";

import { BsBoxArrowUpRight } from "react-icons/bs";

const fetcher = async (url: string, token: string | undefined) => {
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
        mutate,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [`/api/github/issues/${owner}/${repo}/${number}`, session?.accessToken],
        ([url, token]) => fetcher(url, token)
    );

    if (isLoading || isValidating) {
        return <IssueBodySkeleton />;
    }

    if (error) {
        return (
            <p className="col-start-4 col-span-6 my-12 text-3xl text-red-500 text-center font-bold">
                Failed to Load Data
            </p>
        );
    }

    return (
        <article
            role="article"
            className="col-start-1 md:col-start-3 lg:col-start-4 col-span-full md:col-span-8 lg:col-span-6 space-y-10"
        >
            {issue?.author_association === "OWNER" && (
                <DeleteIssueButton params={params} mutate={mutate} />
            )}

            {issue?.author_association === "OWNER" && (
                <UpdateIssueModal
                    params={params}
                    issue={{ title: issue?.title, body: issue?.body }}
                    mutate={mutate}
                />
            )}

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
