import React from "react";

import { IssueNumberPageParams } from "@/types";

import PrevPageButton from "./components/PrevPageButton";
import IssueBody from "./components/IssueBody";
import Comments from "./components/Comments";

const IssueNumberPage = ({ params }: IssueNumberPageParams) => {
    return (
        <main className="min-h-screen">
            <PrevPageButton params={params} />

            <section role="grid" className="grid grid-cols-12 gap-y-8 py-12">
                <IssueBody params={params} />

                <section
                    id="comments"
                    className="col-start-4 col-span-6 grid grid-cols-3 items-center"
                >
                    <hr className="inline border-4" />
                    <h2 className="text-2xl text-center font-bold">Comments</h2>
                    <hr className="inline border-4" />
                </section>

                <Comments params={params} />
            </section>
        </main>
    );
};

export default IssueNumberPage;
