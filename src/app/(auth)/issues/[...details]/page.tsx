"use client";

import React, { useState } from "react";
import { IssuePageParams, Issue } from "@/types";

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import Markdown from "react-markdown";

interface Params {
    params: IssuePageParams;
}

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
    const [owner, repo] = params.details;
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
        <main className="min-h-screen grid grid-cols-12 gap-10 px-12">
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
                    <div key={id} className="grid col-span-full">
                        <h1>{title}</h1>

                        <span>{html_url}</span>

                        <div className="mx-auto prose prose-init prose-stone dark:prose-invert">
                            <Markdown>{body}</Markdown>
                        </div>
                    </div>
                );
            })}
        </main>
    );
};

export default IssuePage;
