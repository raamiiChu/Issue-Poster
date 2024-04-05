import React from "react";

const Skeleton = () => {
    const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <ul
            role="grid"
            className="col-start-2 col-span-10 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16"
        >
            {issues?.map((issue) => {
                return (
                    <li
                        key={issue}
                        role="gridcell"
                        className="flex flex-col justify-between gap-y-5 p-6 border-2 rounded border-black dark:border-white"
                    >
                        <section className="grid grid-cols-12 justify-between items-center gap-x-4">
                            <div className="col-span-8">
                                <h2 className="animate-pulse text-2xl font-bold text-transparent bg-slate-500 dark:bg-slate-300">
                                    title
                                </h2>
                            </div>

                            <span className="animate-pulse col-span-2 text-transparent text-center bg-slate-500 dark:bg-slate-300">
                                # 0
                            </span>

                            <div className="animate-pulse col-span-2 flex justify-end items-center">
                                <div className="size-8 bg-slate-500 dark:bg-slate-300"></div>
                            </div>
                        </section>

                        <div className="animate-pulse flex justify-center px-5 py-1.5 rounded text-transparent bg-slate-500 dark:bg-slate-300">
                            Comments: 0
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Skeleton;
