"use client";

import { Loader2, SendHorizonal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { authClient } from "~/lib/auth-client";
import AnimatedGradientButton from "./AnimatedGradientButton";
import RainbowText from "./RainbowText";

export default function Landing() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const signIn = async () => {
        if (isLoggingIn) return;
        setIsLoggingIn(true);
        try {
            await authClient.signIn.social({ provider: "spotify" });
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <main className="w-screen h-dvh flex flex-col justify-center items-center relative gap-4">
            <div className="flex gap-4 items-center">
                <Image
                    src="/icon.svg"
                    alt="Coverly Logo"
                    width={96}
                    height={96}
                />
                <h1 className="text-6xl font-black">Coverly</h1>
            </div>
            <h2 className="text-2xl font-bold text-center">
                Generate <RainbowText className="italic ">stunning</RainbowText>{" "}
                posters from your favorite albums in just a few clicks!
            </h2>
            <AnimatedGradientButton
                className="text-xl w-72 h-16 cursor-pointer hover:scale-110 flex justify-center items-center disabled:cursor-not-allowed disabled:brightness-70"
                onClick={() => signIn()}
                disabled={isLoggingIn}
            >
                <div className="flex items-center">
                    {isLoggingIn ? (
                        <Loader2 className="animate-spin mr-2" />
                    ) : (
                        <SendHorizonal className="mr-2" />
                    )}
                    Continue with Spotify
                </div>
            </AnimatedGradientButton>
        </main>
    );
}
