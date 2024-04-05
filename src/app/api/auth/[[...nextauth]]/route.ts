import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const { GITHUB_ID, GITHUB_SECRET } = process.env;

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: GITHUB_ID || "",
            clientSecret: GITHUB_SECRET || "",
            authorization: { params: { scope: "user repo" } },
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = token.id;
            session.accessToken = token.accessToken;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user.id;
            }
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
    },
    pages: { error: "/" },
});

export { handler as GET, handler as POST };
