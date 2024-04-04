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
            `https://api.github.com/repos/${owner}/${repo}/issues/${number}`,
            { headers: { Authorization: `Bearer ${githubToken}` } }
        );

        const { data, status } = res;

        if (status === 200) {
            return new NextResponse(JSON.stringify(data), { status });
        }
    } catch (error: any) {
        const { status } = error.response;

        switch (status) {
            case 301:
                return new NextResponse("Moved permanently", { status });
            case 304:
                return new NextResponse("Not modified", { status });
            case 404:
                return new NextResponse("Not found", { status });
            case 410:
                return new NextResponse("Gone", { status });
            default:
                return new NextResponse("Client side error", { status: 400 });
        }
    }
};

export const DELETE = async (
    request: any,
    { params }: IssueNumberPageParams
) => {
    const url = new URL(request.url);

    const { owner, repo, number } = params;
    const githubToken = request.headers.get("Authorization");

    if (!githubToken) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const res = await axios.patch(
            `https://api.github.com/repos/${owner}/${repo}/issues/${number}`,
            { state: "close" },
            { headers: { Authorization: `Bearer ${githubToken}` } }
        );

        const { data, status } = res;

        if (status === 200) {
            return new NextResponse(JSON.stringify(data), { status });
        }
    } catch (error: any) {
        const { status } = error.response;

        switch (status) {
            case 301:
                return new NextResponse("Moved permanently", { status });
            case 403:
                return new NextResponse("Forbidden", { status });
            case 404:
                return new NextResponse("Resource not found", { status });
            case 410:
                return new NextResponse("Gone", { status });
            case 422:
                return new NextResponse(
                    "Validation failed, or the endpoint has been spammed.",
                    { status }
                );
            case 503:
                return new NextResponse("Service unavailable", { status });
            default:
                return new NextResponse("Client side error", { status: 400 });
        }
    }
};
