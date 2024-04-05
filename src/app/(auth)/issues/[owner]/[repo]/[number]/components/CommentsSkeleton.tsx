import React from "react";

const CommentsSkeleton = () => {
    const comments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <ul role="skeleton" className="col-start-4 col-span-6 space-y-8">
            {comments?.map((comment) => {
                return (
                    <li
                        key={comment}
                        className="grid grid-cols-12 gap-2 p-8 rounded-xl bg-slate-200 dark:bg-slate-800"
                    >
                        <div className="animate-pulse bg-slate-400 dark:bg-slate-700 relative col-span-2 size-14 rounded-full">
                            <div />
                        </div>

                        <article className="col-span-10 flex flex-col gap-y-4">
                            <div>
                                <h2 className="animate-pulse bg-slate-400 dark:bg-slate-700 text-2xl text-transparent">
                                    username
                                </h2>
                            </div>

                            <p className="animate-pulse bg-slate-400 dark:bg-slate-700 text-transparent">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Dolores, quisquam.
                            </p>

                            <div className="self-end">
                                <small className="animate-pulse bg-slate-400 dark:bg-slate-700 text-transparent">
                                    2001-01-01 12:00:00
                                </small>
                            </div>
                        </article>
                    </li>
                );
            })}
        </ul>
    );
};

export default CommentsSkeleton;
