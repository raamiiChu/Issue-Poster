import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/Header/Header";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
    title: "Dcard Frontend Intern Homework",
    description: "Dcard Frontend Intern Homework 2024",
    authors: { name: "Ramy Chu", url: "https://github.com/raamiiChu" },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ThemeProvider>
                    <AuthProvider>
                        <Header />
                        <main>{children}</main>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
