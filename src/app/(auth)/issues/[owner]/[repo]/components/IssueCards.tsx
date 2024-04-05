import React from "react";
import Link from "next/link";
import { Issue } from "@/types";

import { BsBoxArrowUpRight } from "react-icons/bs";

type Params = {
    issues: Issue[];
    owner: string;
    repo: string;
};

const IssueCards = ({ issues, owner, repo }: Params) => {
    return (
        <ul
            role="grid"
            className="col-start-2 col-span-10 grid grid-cols-12 gap-x-10 gap-y-16"
        >
            {issues?.map((issue) => {
                const { id, number, html_url, title, comments } = issue;

                return (
                    <li
                        key={id}
                        role="gridcell"
                        className="col-span-6 flex flex-col justify-between gap-y-5 p-6 border-2 rounded border-black dark:border-white"
                    >
                        <section className="grid grid-cols-12 justify-between items-center gap-x-4">
                            <Link
                                className="col-span-8"
                                href={`/issues/${owner}/${repo}/${number}`}
                            >
                                <h2
                                    title={title}
                                    className="text-2xl font-bold line-clamp-1 underline-offset-2 hover:underline transition-all"
                                >
                                    {title}
                                </h2>
                            </Link>

                            <Link
                                className="col-span-2 flex items-center text-2xl"
                                href={html_url}
                                target="_blank"
                            >
                                <BsBoxArrowUpRight className="text-black dark:text-white hover:opacity-50 transition-all" />
                            </Link>

                            <span className="col-span-2 text-center">
                                # {number}
                            </span>
                        </section>

                        <Link
                            href={`/issues/${owner}/${repo}/${number}#comments`}
                            className="px-5 py-1.5 border border-black rounded bg-white text-black text-center font-bold hover:opacity-50 transition-all duration-500"
                        >
                            Comments: {comments}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default IssueCards;
