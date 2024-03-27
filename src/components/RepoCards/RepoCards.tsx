"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Repo } from "@/types";

import { FaLink } from "react-icons/fa";
import { format } from "date-fns";

interface Params {
    repos: Repo[];
}

const RepoCards = ({ repos }: Params) => {
    return (
        <ul className="col-start-3 col-span-8 grid grid-cols-1 gap-y-5">
            {repos?.map((repo: Repo, index) => {
                const { id, name, owner, html_url, description, created_at } =
                    repo;

                return (
                    <li
                        key={id}
                        className={`p-8 grid grid-cols-12 items-center gap-2.5 ${
                            index % 2 === 1
                                ? "bg-blue-200 dark:bg-blue-900"
                                : "bg-slate-300 dark:bg-slate-800"
                        }`}
                    >
                        <section className="col-span-6 flex gap-x-2.5">
                            <h2
                                className="text-xl font-bold line-clamp-1"
                                title={name}
                            >
                                {name}
                            </h2>
                            <Link
                                href={html_url}
                                title={name}
                                target="blank"
                                className="flex items-center hover:opacity-50 transition-all duration-500"
                            >
                                <FaLink className="text-xl" />
                            </Link>
                        </section>

                        <section className="col-span-6">
                            <Link href={`/issues/${owner.login}/${name}`}>
                                See Issues
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
                                    target="blank"
                                    className="size-6 relative hover:opacity-50 transition-all duration-500"
                                >
                                    <Image
                                        src={owner.avatar_url}
                                        fill={true}
                                        alt={owner.login}
                                        className="rounded-full"
                                    />
                                </Link>
                                <span>{owner.login}</span>
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
