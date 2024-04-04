"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Repo } from "@/types";

import { BsBoxArrowUpRight } from "react-icons/bs";
import { format } from "date-fns";

type Params = {
    repos: Repo[];
};

const RepoCards = ({ repos }: Params) => {
    return (
        <ul className="col-start-3 col-span-8 grid grid-cols-1 gap-y-5">
            {repos?.map((repo: Repo, index) => {
                const {
                    id,
                    name,
                    owner,
                    html_url,
                    description,
                    open_issues_count,
                    created_at,
                } = repo;

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
                                href={`/issues/${owner.login}/${name}`}
                                title={name}
                            >
                                <h2
                                    className="text-xl font-bold line-clamp-1 transition-all hover:underline"
                                    title={name}
                                >
                                    {name}
                                </h2>
                            </Link>
                            <Link
                                href={html_url}
                                title={name}
                                target="_blank"
                                className="flex items-center hover:opacity-50 transition-all"
                            >
                                <BsBoxArrowUpRight className="text-xl" />
                            </Link>
                        </section>

                        <section className="col-span-6 grid grid-cols-3">
                            <Link
                                href={`/issues/${owner.login}/${name}`}
                                className="col-end-4 border border-black rounded text-center bg-white text-black font-bold hover:opacity-50 transition-all duration-500"
                            >
                                Issues: {open_issues_count}
                            </Link>
                        </section>

                        <p
                            title={description || name}
                            className="col-span-full text-sm line-clamp-2"
                        >
                            {description || name}
                        </p>

                        <section className="col-span-full flex justify-between">
                            <section className="flex items-center gap-x-2.5">
                                <span>Created By:</span>
                                <Link
                                    href={owner.html_url}
                                    target="_blank"
                                    className="size-6 relative hover:opacity-50 transition-all"
                                >
                                    <Image
                                        src={owner.avatar_url}
                                        fill={true}
                                        alt={owner.login}
                                        className="rounded-full"
                                    />
                                </Link>
                                <Link href={owner.html_url}>
                                    <span className="hover:underline underline-offset-2">
                                        {owner.login}
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

export default RepoCards;
