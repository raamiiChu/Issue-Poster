"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import { FaLink } from "react-icons/fa";
import { format } from "date-fns";

interface Repo {
    id: number;
    name: string;
    owner: { login: string; html_url: string };
    html_url: string;
    description: string;
    created_at: string;
}

interface Params {
    repos: Repo[];
}

const RepoCards = ({ repos }: Params) => {
    return (
        <ul className="col-start-3 col-span-8 grid grid-cols-1 gap-y-5 divide-black dark:divide-white">
            {repos?.map((repo: Repo, index) => {
                const { id, name, owner, html_url, description, created_at } =
                    repo;

                return (
                    <li
                        key={id}
                        className={`p-8 grid grid-cols-12 items-center gap-2.5 ${
                            index % 2 === 1
                                ? "bg-blue-300 dark:bg-blue-800"
                                : "bg-slate-300 dark:bg-slate-800"
                        }`}
                    >
                        <section className="col-span-6">
                            <section className="flex gap-5">
                                <h2 className="text-xl font-bold">{name}</h2>
                                <Link
                                    href={html_url}
                                    title={name}
                                    target="blank"
                                    className="group flex items-center"
                                >
                                    <FaLink className="text-xl group-hover:opacity-75" />
                                </Link>
                            </section>

                            <h3
                                title={description || name}
                                className="line-clamp-2"
                            >
                                {description || name}
                            </h3>
                        </section>

                        {/* href */}
                        <section className="col-span-6"></section>

                        <section className="col-span-full flex justify-between">
                            <Link href={owner.html_url} target="blank">
                                <p>Created By: {owner.login}</p>
                            </Link>
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
