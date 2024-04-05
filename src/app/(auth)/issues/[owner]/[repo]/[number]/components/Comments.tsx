"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import axios from "axios";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { Comment, IssueNumberPageParams } from "@/types";

import Markdown from "react-markdown";
import { format } from "date-fns";

import CommentsSkeleton from "./CommentsSkeleton";

const fetcher = async (url: string, token: string | undefined) => {
    const { data, status } = await axios.get(url, {
        headers: { Authorization: token },
    });

    if (status === 200) {
        return data as Comment[];
    }
};

const Comments = ({ params }: IssueNumberPageParams) => {
    const { owner, repo, number } = params;
    const { data: session } = useSession();

    const {
        data: comments,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [
            `/api/github/issues/${owner}/${repo}/${number}/comments`,
            session?.accessToken,
        ],
        ([url, token]) => fetcher(url, token)
    );

    if (isLoading || isValidating) {
        return <CommentsSkeleton />;
    }

    if (error) {
        return (
            <p className="col-start-4 col-span-6 my-12 text-3xl text-red-500 text-center font-bold">
                Failed to Load Data
            </p>
        );
    }

    return (
        <ul
            role="listbox"
            className="col-start-1 md:col-start-3 lg:col-start-4 col-span-full md:col-span-8 lg:col-span-6 space-y-8 py-8"
        >
            {comments?.length === 0 && (
                <h2 className="text-3xl text-center">
                    Oops, there&apos;s no comments in this issue.
                </h2>
            )}

            {comments?.map((comment) => {
                const { id, html_url, body, user, created_at } = comment;

                return (
                    <li
                        key={id}
                        className="grid grid-cols-12 gap-2 p-8 rounded-xl bg-slate-200 dark:bg-slate-800"
                    >
                        <Link
                            title={user.login}
                            href={user.html_url}
                            target="_blank"
                            className="relative col-span-2 size-14 rounded-full overflow-hidden"
                        >
                            <Image
                                src={user.avatar_url}
                                alt={user.login}
                                fill={true}
                                className="transition-all hover:scale-125"
                            />
                        </Link>

                        <article className="col-span-10 flex flex-col gap-y-4">
                            <Link href={user.html_url} target="_blank">
                                <h2 className="text-2xl text-blue-500 font-bold transition-all hover:underline">
                                    {user.login}
                                </h2>
                            </Link>

                            <p className="prose prose-init prose-stone dark:prose-invert">
                                <Markdown>{body}</Markdown>
                            </p>

                            <Link
                                href={html_url}
                                target="_blank"
                                className="self-end hover:underline"
                            >
                                <small>
                                    {format(
                                        new Date(created_at),
                                        "yyyy-MM-dd hh:mm:ss"
                                    )}
                                </small>
                            </Link>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
};

export default Comments;
