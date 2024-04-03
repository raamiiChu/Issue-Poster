import { NextResponse } from "next/server";
import axios from "axios";

import { IssueNumberPageParams } from "@/types";

export const GET = async (request: any, { params }: IssueNumberPageParams) => {
    const url = new URL(request.url);

    const { owner, repo, number } = params;
    const githubToken = request.headers.get("Authorization");

    if (!githubToken) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const res = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/issues/${number}/comments`,
            { headers: { Authorization: `Bearer ${githubToken}` } }
        );

        const { data, status } = res;

        if (status === 200) {
            return new NextResponse(JSON.stringify(data), { status });
        }
    } catch (error: any) {
        const { status } = error.response;

        switch (status) {
            case 404:
                return new NextResponse("Resource not found", { status });
            case 410:
                return new NextResponse("Gone", { status });
            default:
                return new NextResponse("Client side error", { status: 400 });
        }
    }
};
