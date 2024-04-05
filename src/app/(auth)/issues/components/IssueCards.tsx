"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Issue } from "@/types";

import { BsBoxArrowUpRight } from "react-icons/bs";
import { format } from "date-fns";

type Params = {
    issues: Issue[];
};

const IssueCards = ({ issues }: Params) => {
    return (
        <ul className="col-start-3 col-span-8 grid grid-cols-1 gap-y-5">
            {issues?.map((issue: Issue, index) => {
                const {
                    id,
                    number,
                    title,
                    html_url,
                    comments,
                    created_at,
                    user,
                    repository,
                } = issue;

                return (
                    <li
                        key={id}
                        className={`p-8 grid grid-cols-12 items-center gap-2.5 rounded-lg ${
                            index % 2 === 1
                                ? "bg-blue-200 dark:bg-blue-900"
                                : "bg-slate-300 dark:bg-slate-800"
                        }`}
                    >
                        <section className="col-span-6 flex gap-x-2.5">
                            <Link
                                href={`/issues/${repository.full_name}/${number}`}
                                title={title}
                            >
                                <h2
                                    className="text-xl font-bold line-clamp-1 transition-all hover:underline"
                                    title={title}
                                >
                                    {title}
                                </h2>
                            </Link>
                            <Link
                                href={html_url}
                                title={title}
                                target="_blank"
                                className="flex items-center hover:opacity-50 transition-all"
                            >
                                <BsBoxArrowUpRight className="text-xl" />
                            </Link>
                        </section>

                        <section className="col-span-6 grid grid-cols-3">
                            <Link
                                href={`/issues/${repository.full_name}/${number}#comments`}
                                className="col-end-4 border border-black rounded text-center bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                            >
                                Comments: {comments}
                            </Link>
                        </section>

                        <section className="col-span-full flex justify-between">
                            <section className="flex items-center gap-x-2.5">
                                <span>Created By:</span>
                                <Link
                                    href={user.html_url}
                                    target="_blank"
                                    className="size-6 relative hover:opacity-50 transition-all"
                                >
                                    <Image
                                        src={user.avatar_url}
                                        fill={true}
                                        alt={user.login}
                                        className="rounded-full"
                                    />
                                </Link>
                                <Link href={user.html_url}>
                                    <span className="hover:underline underline-offset-2">
                                        {user.login}
                                    </span>
                                </Link>
                            </section>

                            <small className="text-sm">
                                Created At:{" "}
                                {format(new Date(created_at), "yyyy / MM / dd")}
                            </small>
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};

export default IssueCards;
