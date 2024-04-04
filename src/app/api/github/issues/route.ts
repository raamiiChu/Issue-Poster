import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (request: any) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");
    const githubToken = request.headers.get("Authorization");

    try {
        const res = await axios.get(
            `https://api.github.com/issues?filter=created&per_page=10&page=${page}`,
            {
                headers: { Authorization: `Bearer ${githubToken}` },
            }
        );

        const { data, status } = res;

        if (status === 200) {
            return new NextResponse(JSON.stringify(data), { status });
        }
    } catch (error: any) {
        const { status } = error.response;

        switch (status) {
            case 304:
                return new NextResponse("Not modified", { status });
            case 404:
                return new NextResponse("Resource not found", { status });
            case 422:
                return new NextResponse(
                    "Validation failed, or the endpoint has been spammed.",
                    { status }
                );
            default:
                return new NextResponse("Client side error", { status: 400 });
        }
    }
};
