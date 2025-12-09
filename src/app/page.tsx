"use client";
import { useTheme } from "next-themes";
import DarkVeil from "~/components/DarkVeil";
import HomePage from "~/components/HomePage";
import Landing from "~/components/Landing";
import LightVeil from "~/components/LightVeil";
import { authClient } from "~/lib/auth-client";

export default function Home() {
    const { data: session } = authClient.useSession();
    const { resolvedTheme } = useTheme();

    return (
        <main className="w-screen h-dvh relative">
            <div className="w-full h-full absolute left-0 top-0 -z-10">
                {resolvedTheme === "light" ? <LightVeil /> : <DarkVeil />}
            </div>
            {session ? <HomePage /> : <Landing />}
        </main>
    );
}
