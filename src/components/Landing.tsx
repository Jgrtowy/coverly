"use client";

import Image from "next/image";
import { authClient } from "~/lib/auth-client";
import { Button } from "./ui/button";

export default function Landing() {
    const signIn = async () => {
        await authClient.signIn.social({ provider: "spotify" });
    };

    return (
        <main className="dark:text-foreground text-background w-screen h-dvh flex flex-col justify-center items-center relative gap-4">
            <div className="flex gap-4 items-center">
                <Image
                    src="/icon.svg"
                    alt="Coverly Logo"
                    width={96}
                    height={96}
                />
                <h1 className="text-6xl font-black">Coverly</h1>
            </div>
            <h2 className="text-2xl font-bold italic">
                Generate beautiful posters from your favorite albums in just a
                few clicks!
            </h2>
            <Button
                className="text-xl w-72 h-16 cursor-pointer"
                onClick={() => signIn()}
            >
                Continue with Spotify
            </Button>
        </main>
    );
}
