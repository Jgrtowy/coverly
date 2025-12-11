import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "~/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Coverly",
    description: "Create and customize album covers with Coverly",
    icons: {
        icon: [
            {
                url: "/icon.svg",
                type: "image/svg+xml",
            },
        ],
        shortcut: "/favicon.ico",
    },
    applicationName: "Coverly",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    creator: "Dawid Gul",
    authors: [
        {
            name: "Dawid Gul",
            url: "https://github.com/Jgrtowy",
        },
    ],
    metadataBase: new URL("https://aniwheel.moe"),
    alternates: { canonical: "/" },
    keywords: [
        "coverly",
        "album cover maker",
        "album cover creator",
        "album cover generator",
        "music cover design",
        "custom album art",
        "digital album cover",
        "music artwork tool",
        "album cover templates",
        "cover art customization",
    ],
    category: "Entertainment",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black bg-white max-h-dvh`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
