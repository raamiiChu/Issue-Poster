import React from "react";

import { IssueNumberPageParams } from "@/types";

import PrevPageButton from "./components/PrevPageButton";
import IssueBody from "./components/IssueBody";
import Comments from "./components/Comments";

const IssueNumberPage = ({ params }: IssueNumberPageParams) => {
    return (
        <main className="container min-h-screen mx-auto px-6 sm:px-12 py-16">
            <PrevPageButton params={params} />

            <section role="grid" className="grid grid-cols-12 gap-y-8">
                <IssueBody params={params} />

                <section
                    id="comments"
                    className="col-start-1 md:col-start-3 lg:col-start-4 col-span-full md:col-span-8 lg:col-span-6 grid grid-cols-12 gap-x-4 items-center"
                >
                    <hr className="col-span-3 inline border-4" />
                    <h2 className="col-span-6 text-xl lg:text-2xl text-center font-bold">
                        Comments
                    </h2>
                    <hr className="col-span-3 inline border-4" />
                </section>

                <Comments params={params} />
            </section>
        </main>
    );
};

export default IssueNumberPage;
