import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import type { Album } from "spotify-types";
import { cn } from "~/lib/utils";

export default function AlbumCard({ album }: { album: Album }) {
    return (
        <Link
            className="relative flex flex-col justify-end w-48 h-48 scale-100 hover:scale-105 brightness-75 hover:brightness-100 ease-in-out duration-150 cursor-pointer"
            href={`/editor?id=${album.id}`}
        >
            <div className="absolute inset-0 rounded-[inherit]">
                <Image
                    className={cn(
                        "object-cover -z-10 ease-in-out duration-125 rounded-lg",
                    )}
                    src={
                        album.images[0]?.url ??
                        album.images[1]?.url ??
                        album.images[2]?.url ??
                        "/placeholder.webp"
                    }
                    alt={album.name}
                    fill
                    sizes="100%"
                />
            </div>
            <div className="p-1 max-w-fit px-2 border rounded-md text-left bg-secondary m-1">
                <p className={cn("font-medium leading-tight truncate")}>
                    {album.name}
                </p>
            </div>
        </Link>
    );
}
