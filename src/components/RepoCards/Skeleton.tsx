import React from "react";

const Skeleton = () => {
    const repos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <ul className="col-start-3 col-span-8 grid grid-cols-1 divide-y text-transparent">
            {repos?.map((repo) => {
                return (
                    <li
                        key={repo}
                        className="animate-pulse p-5 grid items-center gap-2.5"
                    >
                        <section className="col-span-6">
                            <section className="flex gap-5">
                                <h2 className="text-xl font-bold bg-slate-700">
                                    this is the name of repo
                                </h2>
                            </section>

                            <h3 className="line-clamp-2 bg-slate-700">
                                description
                            </h3>
                        </section>

                        <section className="col-span-6"></section>

                        <section className="col-span-full flex justify-between">
                            <div>
                                <p className="bg-slate-700">
                                    Created By: Owner
                                </p>
                            </div>
                            <small className="text-sm bg-slate-700">
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
