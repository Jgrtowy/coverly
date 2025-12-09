"use client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { authClient } from "~/lib/auth-client";
import { useAppStateStore } from "~/lib/store";
import Searchbar from "./Searchbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";

export default function Header() {
    const { data: session } = authClient.useSession();
    const { setSearchQuery, setInputValue } = useAppStateStore();

    return (
        <div className="flex justify-between">
            <div className="w-1/3">
                <button
                    type="button"
                    onClick={() => {
                        setSearchQuery("");
                        setInputValue("");
                    }}
                    className="flex gap-2 items-center cursor-pointer group"
                >
                    <Image
                        src="/icon.svg"
                        alt="Coverly Logo"
                        width={36}
                        height={36}
                        className="group-hover:-rotate-45 transition-transform duration-300"
                    />
                    <h1 className="text-3xl font-black group-hover:brightness-70 transition-all duration-300">
                        Coverly
                    </h1>
                </button>
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
