import React from "react";

const Skeleton = () => {
    const repos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <ul className="col-start-1 md:col-start-2 lg:col-start-3 col-span-full md:col-span-10 lg:col-span-8 grid grid-cols-1 gap-y-5 text-transparent">
            {repos?.map((repo, index) => {
                return (
                    <li
                        key={repo}
                        className={`animate-pulse p-4 sm:p-8 grid grid-cols-12 items-center gap-2.5 rounded-lg ${
                            index % 2 === 0
                                ? "bg-slate-400 dark:bg-slate-700"
                                : "bg-slate-200 dark:bg-slate-500"
                        }`}
                    >
                        <section className="col-span-full md:col-span-6 grid grid-cols-6 md:flex md:justify-start gap-x-2.5">
                            <h2 className="col-span-5 text-xl font-bold bg-slate-500 dark:bg-slate-300">
                                this is the name of issue
                            </h2>
                            <p className="col-span-1 bg-slate-500 dark:bg-slate-300">
                                link
                            </p>
                        </section>

                        <section className="col-span-6 hidden md:grid grid-cols-3">
                            <div className="col-start-2 lg:col-start-3 col-span-2 lg:col-span-1 rounded text-transparent bg-slate-500 dark:bg-slate-300">
                                Comments: 0
                            </div>
                        </section>

                        <section className="col-span-full flex justify-center md:justify-between">
                            <div className="hidden md:flex items-center gap-x-2.5">
                                <p className="bg-slate-500 dark:bg-slate-300">
                                    Created By: Owner
                                </p>
                            </div>
                            <small className="text-sm bg-slate-500 dark:bg-slate-300">
                                Created At: 1999 / 12 / 31
                            </small>
                        </section>

                        <section className="col-span-full grid md:hidden grid-cols-3">
                            <div className="col-start-1 sm:col-start-2 col-span-full sm:col-span-1 p-2 rounded text-transparent bg-slate-500 dark:bg-slate-300">
                                Comments: 0
                            </div>
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};

export default Skeleton;
