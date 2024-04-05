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
        <ul className="col-start-1 md:col-start-2 lg:col-start-3 col-span-full md:col-span-10 lg:col-span-8 grid grid-cols-1 gap-y-5">
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
                        className={`p-4 sm:p-8 grid grid-cols-12 items-center gap-2.5 rounded-lg ${
                            index % 2 === 1
                                ? "bg-blue-200 dark:bg-blue-900"
                                : "bg-slate-300 dark:bg-slate-800"
                        }`}
                    >
                        <section className="col-span-full md:col-span-6 grid grid-cols-6 md:flex md:justify-start gap-x-2.5">
                            <Link
                                href={`/issues/${repository.full_name}/${number}`}
                                title={title}
                                className="col-span-5"
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
                                className="col-span-1 flex justify-end items-center hover:opacity-50 transition-all"
                            >
                                <BsBoxArrowUpRight className="text-xl" />
                            </Link>
                        </section>

                        <section className="col-span-6 hidden md:grid grid-cols-3">
                            <Link
                                href={`/issues/${repository.full_name}/${number}#comments`}
                                className="col-start-2 lg:col-start-3 col-span-2 lg:col-span-1 border border-black rounded text-center bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                            >
                                Comments: {comments}
                            </Link>
                        </section>

                        <section className="col-span-full flex justify-center md:justify-between">
                            <section className="hidden md:flex items-center gap-x-2.5">
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

                        <section className="col-span-full grid md:hidden grid-cols-3">
                            <Link
                                href={`/issues/${repository.full_name}/${number}#comments`}
                                className="col-start-1 sm:col-start-2 col-span-full sm:col-span-1 p-2 border border-black rounded text-center bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                            >
                                Comments: {comments}
                            </Link>
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};

export default IssueCards;
