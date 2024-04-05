"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

import { IssueNumberPageParams } from "@/types";

import { FaRegTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
});

const DeleteIssueButton = ({ params }: IssueNumberPageParams) => {
    const { owner, repo, number } = params;

    const router = useRouter();
    const { data: session } = useSession();

    const handleDelete = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: true,
            showDenyButton: true,
            denyButtonText: "Delete",
        });

        if (result.isDenied) {
            Swal.fire({
                icon: "info",
                title: "Deleting Issue",
                text: "Please wait...",
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            try {
                const { status } = await axios.delete(
                    `/api/github/issues/${owner}/${repo}/${number}`,
                    {
                        headers: { Authorization: session?.accessToken },
                    }
                );

                Swal.close();

                if (status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Delete successfully",
                    });

                    router.push(`/issues/${owner}/${repo}`);
                }
            } catch (error: any) {
                Swal.close();

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something error",
                });

                console.log(error.response);
            }
        }
    };

    return (
        <button
            className="fixed bottom-10 right-24 sm:right-32 p-3 rounded-full text-red-500 bg-white border-2 border-black transition-all hover:text-white hover:bg-red-500"
            onClick={handleDelete}
        >
            <FaRegTrashAlt className="text-2xl" />
        </button>
    );
};

export default DeleteIssueButton;
