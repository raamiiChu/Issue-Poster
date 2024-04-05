import nextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: string;
        expires: string;
        user: { email: string; id: string; image: string; name: string };
    }
}
