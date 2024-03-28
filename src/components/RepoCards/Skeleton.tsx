import React from "react";

const Skeleton = () => {
    const repos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <ul className="col-start-3 col-span-8 grid grid-cols-1 gap-y-5 text-transparent">
            {repos?.map((repo, index) => {
                return (
                    <li
                        key={repo}
                        className={`animate-pulse p-8 grid grid-cols-12 items-center gap-2.5 rounded-lg ${
                            index % 2 === 0
                                ? "bg-slate-400 dark:bg-slate-700"
                                : "bg-slate-200 dark:bg-slate-500"
                        }`}
                    >
                        <section className="col-span-6 flex gap-x-2.5">
                            <h2 className="text-xl font-bold bg-slate-500 dark:bg-slate-300">
                                this is the name of repo
                            </h2>
                        </section>

                        <section className="col-span-6 grid grid-cols-3">
                            <div className="col-end-4 rounded text-transparent bg-slate-500 dark:bg-slate-300">
                                Issues: 0
                            </div>
                        </section>

                        <p className="text-sm line-clamp-2 bg-slate-500 dark:bg-slate-300">
                            description
                        </p>

                        <section className="col-span-full flex justify-between">
                            <div>
                                <p className="bg-slate-500 dark:bg-slate-300">
                                    Created By: Owner
                                </p>
                            </div>
                            <small className="text-sm bg-slate-500 dark:bg-slate-300">
                                Created At: 1999 / 12 / 31
                            </small>
                        </section>
                    </li>
                );
            })}
        </ul>
    );
};

export default Skeleton;
