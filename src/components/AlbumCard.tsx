import Image from "next/image";
import { cn } from "~/lib/utils";

export default function AlbumCard({ album }: { album: Album }) {
    return (
        <div className="relative flex flex-col justify-end w-48 h-48 scale-90 hover:scale-100 brightness-75 hover:brightness-100 ease-in-out duration-150 cursor-pointer">
            <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
                <Image
                    className={cn(
                        "object-cover -z-10 ease-in-out duration-125 rounded-lg",
                    )}
                    src={album.imageUrl}
                    alt={album.name}
                    fill
                    sizes="100%"
                />
            </div>
            <div className="p-1 max-w-fit px-2 border rounded-md text-left bg-primary m-1">
                <p className={cn("font-medium leading-tight truncate")}>
                    {album.name}
                </p>
            </div>
        </div>
    );
}
