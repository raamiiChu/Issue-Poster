import { NextResponse } from "next/server";
import axios from "axios";

interface Params {
    details: [owner: string, repo: string];
}

export const GET = async (request: any, { params }: { params: Params }) => {
    const url = new URL(request.url);

    const [owner, repo] = params.details;
    const page = url.searchParams.get("page");
    const githubToken = request.headers.get("Authorization");

    if (!githubToken) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const res = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues?per_page=10&page=${page}`,
        { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    if (!res) {
        return new NextResponse("Client side error", { status: 400 });
    }

    const { data, status } = res;

    switch (status) {
        case 200:
            return new NextResponse(JSON.stringify(data), { status });
        case 301:
            return new NextResponse("Moved permanently", { status });
        case 404:
            return new NextResponse("Not found", { status });
        case 422:
            return new NextResponse(
                "Validation failed, or the endpoint has been spammed",
                { status }
            );
        default:
            return new NextResponse("Client side error", { status: 400 });
    }
};
