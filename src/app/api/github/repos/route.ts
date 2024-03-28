import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async (request: any) => {
    const url = new URL(request.url);

    const page = url.searchParams.get("page");
    const githubToken = request.headers.get("Authorization");

    const res = await axios.get(
        `https://api.github.com/user/repos?visibility=public&per_page=10&page=${page}`,
        { headers: { Authorization: `Bearer ${githubToken}` } }
    );

    if (!res) {
        return new NextResponse("Client error", { status: 400 });
    }

    const { data, status, statusText } = res;

    switch (status) {
        case 200:
            return new NextResponse(JSON.stringify(data), { status });
            break;
        case 401:
            return new NextResponse(statusText, { status });
            break;
        default:
            return new NextResponse("Client error", { status: 400 });
            break;
    }
};
