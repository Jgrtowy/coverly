"use client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { authClient } from "~/lib/auth-client";
import Searchbar from "./Searchbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
    const { data: session } = authClient.useSession();

    const signIn = async () => {
        await authClient.signIn.social({ provider: "spotify" });
    };

    return (
        <div className="flex justify-between">
            <div className="flex w-1/3 items-center gap-2">
                <Image
                    src="/icon.svg"
                    alt="Coverly Logo"
                    width={36}
                    height={36}
                />
                <h1 className="text-3xl font-black">Coverly</h1>
            </div>
            <div className="w-1/3">
                <Searchbar />
            </div>
            <div className="w-1/3 flex justify-end">
                {!session && <Skeleton className="size-10 rounded-full" />}
                {session && (
                    <div className="flex w-full justify-end items-center gap-2">
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="size-10 cursor-pointer">
                                    <AvatarImage
                                        src={
                                            session.user.image ||
                                            "/default-avatar.png"
                                        }
                                        alt="User Avatar"
                                    />
                                    <AvatarFallback>
                                        {session.user.name?.[0] || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[360px] p-0 bg-accent/15 backdrop-blur-sm overflow-hidden border border-accent-foreground/20"
                                align="end"
                            >
                                <div className="flex flex-col p-4">
                                    <span className="text-secondary text-xs">
                                        Logged in as
                                    </span>
                                    <span className="text-2xl font-bold text-foreground">
                                        {session.user.name}
                                    </span>
                                </div>
                                <Separator className="bg-accent-foreground/20" />
                                <Button
                                    variant="ghost"
                                    className="justify-start text-destructive hover:text-destructive w-full rounded-none"
                                    onClick={() => authClient.signOut()}
                                >
                                    <LogOut className="size-5 mr-2" />
                                    Sign Out
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                )}
            </div>
        </div>
    );
}
