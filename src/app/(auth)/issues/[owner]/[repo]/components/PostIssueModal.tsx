"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import axios from "axios";
import { useSession } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import TurndownService from "turndown";

import { IssuePageParams } from "@/types";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required.",
    }),
    body: z.string().min(30, {
        message: "Body must be at least 30 characters.",
    }),
});

const PostIssueModal = ({ params }: IssuePageParams) => {
    const { owner, repo } = params;

    const [open, setOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    // Define the form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "Title",
            body: "body",
        },
    });

    // Define a submit handler.
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        const { title, body } = values;

        const turndownService = new TurndownService();
        const markdown = turndownService.turndown(body);

        Swal.fire({
            icon: "info",
            title: "Creating Issue",
            text: "Please wait...",
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            const { status } = await axios.post(
                `/api/github/issues/${owner}/${repo}`,
                { title, body: markdown },
                { headers: { Authorization: session?.accessToken } }
            );

            Swal.close();

            if (status === 201) {
                Toast.fire({
                    icon: "success",
                    title: "Create successfully",
                });

                setOpen(false);
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
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                asChild
                className="col-start-2 md:col-start-4 lg:col-start-5 col-span-10 md:col-span-6 lg:col-span-4 px-5 py-2.5 border border-black rounded bg-white text-black font-bold hover:opacity-50 dark:hover:bg-white dark:hover:text-black transition-all duration-500"
            >
                <Button variant="outline">Post an Issue</Button>
            </DialogTrigger>
            <DialogContent className="bg-white sm:max-w-[600px] ">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Post an Issue
                    </DialogTitle>
                    <DialogDescription>
                        Create an issue here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-bold">
                                        Title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="title"
                                            {...field}
                                            className="placeholder:text-slate-400"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your title.
                                    </FormDescription>
                                    <FormMessage className="text-red-500 font-bold" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg font-bold">
                                        Body
                                    </FormLabel>
                                    <FormControl className="h-40">
                                        <ReactQuill
                                            theme="snow"
                                            placeholder="body"
                                            {...field}
                                            className=" placeholder:text-slate-400"
                                        />
                                    </FormControl>
                                    <FormDescription className="pt-12">
                                        This is your body.
                                    </FormDescription>
                                    <FormMessage className="text-red-500 font-bold" />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="px-5 py-2.5 border border-black rounded bg-white text-black font-bold hover:bg-black hover:text-white transition-all duration-500"
                            >
                                Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default PostIssueModal;
