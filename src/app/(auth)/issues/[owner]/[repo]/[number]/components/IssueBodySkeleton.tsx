import React from "react";

const IssueBodySkeleton = () => {
    return (
        <section className="col-start-4 col-span-6 h-96 flex items-center justify-center">
            <div className="animate-spin size-12 mx-auto my-12 border-b-4 border-slate-900 dark:border-white rounded-full"></div>
        </section>
    );
};

export default IssueBodySkeleton;
