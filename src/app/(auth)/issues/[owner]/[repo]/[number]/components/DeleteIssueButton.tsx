"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import { IssueNumberPageParams } from "@/types";

import { FaRegTrashAlt } from "react-icons/fa";

const DeleteIssueButton = ({ params }: IssueNumberPageParams) => {
    const { owner, repo, number } = params;

    const router = useRouter();
    const { data: session } = useSession();

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const { status } = await axios.delete(
                `/api/github/issues/${owner}/${repo}/${number}`,
                {
                    headers: { Authorization: session?.accessToken },
                }
            );

            if (status === 200) {
                alert("delete successfully");
                router.push(`/issues/${owner}/${repo}`);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    return (
        <button
            className="fixed bottom-10 right-32 p-3 rounded-full text-red-500 bg-white border border-black transition-all hover:text-white hover:bg-red-500"
            onClick={handleDelete}
        >
            <FaRegTrashAlt className="text-2xl" />
        </button>
    );
};

export default DeleteIssueButton;
