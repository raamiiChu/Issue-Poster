import React from "react";
import Link from "next/link";

import { IssueNumberPageParams } from "@/types";

const PrevPageButton = ({ params }: IssueNumberPageParams) => {
    const { owner, repo } = params;

    return (
        <Link
            href={`/issues/${owner}/${repo}`}
            className="fixed top-20 left-10 px-5 py-1.5 border border-black rounded bg-white text-black text-center font-bold hover:opacity-50 transition-all duration-500"
        >
            Go Back
        </Link>
    );
};

export default PrevPageButton;
