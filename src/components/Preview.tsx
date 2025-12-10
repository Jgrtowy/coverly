import { CalendarDaysIcon, Disc3 } from "lucide-react";
import Image from "next/image";
import type { Album, SimplifiedTrack } from "spotify-types";
import { useEditorStore } from "~/lib/store";
import { cn } from "~/lib/utils";
import { Separator } from "./ui/separator";

export interface Settings {
    showTrackNumbers: boolean;
    showSpotifyCode: boolean;
    showWatermark: boolean;
    layout: "signle" | "list";
    orientation: "portrait" | "landscape";
    rows: number;
    columns: number;
}

export default function Preview({ album }: { album: Album }) {
    const tracks = (album as { tracks: { items: SimplifiedTrack[] } }).tracks
        .items;

    const { settings } = useEditorStore();

    const classes = cn(
        "w-[210mm] h-[297mm] bg-white flex flex-col gap-4 overflow-hidden relative",
    );

    return (
        <div
            className={classes}
            style={{
                padding: `${settings.padding}px`,
                backgroundColor: settings.bgColor || "#ffffff",
                color: settings.textColor || "#000000",
            }}
        >
            <div>
                {album.images[0] && (
                    <Image
                        src={settings.customImage ?? album.images[0].url}
                        alt={album.name}
                        width={1200}
                        height={1200}
                        unoptimized
                    />
                )}
            </div>
            {settings.layout === "list" && (
                <>
                    <div className="space-y-2">
                        <Separator className="h-1 bg-black" />
                        <div className="flex justify-between">
                            <div className="flex flex-col items-start w-2/3">
                                <h1 className="text-4xl font-bold">
                                    {album.name}
                                </h1>
                                <h2 className="text-3xl">
                                    {album.artists
                                        .map((artist) => artist.name)
                                        .join(", ")}
                                </h2>
                            </div>

                            <div className="flex flex-col items-end w-1/3">
                                <h1>
                                    {new Date(
                                        album.release_date,
                                    ).toLocaleDateString("en-us", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </h1>
                                {settings.showSpotifyCode && (
                                    <div className="flex items-center justify-center h-12">
                                        <Image
                                            src={`https://scannables.scdn.co/uri/plain/svg/FFFFFF/black/640/spotify:album:${album.id}`}
                                            alt="Spotify Code"
                                            width={640}
                                            height={240}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Separator className="h-1 bg-black" />
                    </div>
                    <div className="max-w-full flex flex-col flex-wrap overflow-y-auto">
                        {tracks
                            .slice(0, settings.tracks)
                            .map((track, index) => (
                                <div
                                    key={track.id}
                                    className="flex max-w-fit items-center"
                                    style={{
                                        fontSize: `${settings.trackFontSize}px`,
                                        gap: `${settings.trackFontSize * 0.8}px`,
                                    }}
                                >
                                    {settings.showTrackNumbers && (
                                        <span className="w-4 font-mono font-bold">
                                            {(index + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                        </span>
                                    )}
                                    <span className="max-w-72 truncate">
                                        {track.name}
                                    </span>
                                </div>
                            ))}
                    </div>

                    {settings.showWatermark && (
                        <div
                            className={`absolute text-lg flex items-center gap-2`}
                            style={{
                                bottom: `${settings.padding}px`,
                                right: `${settings.padding}px`,
                            }}
                        >
                            <span>
                                Made with{" "}
                                <span className="font-bold">Coverly</span>
                            </span>
                            <Image
                                src="/icon.svg"
                                alt="Watermark"
                                width={24}
                                height={24}
                            />{" "}
                        </div>
                    )}
                </>
            )}
            {settings.layout === "single" && (
                <div className="flex items-center h-full flex-col gap-4 justify-center">
                    <h1 className="text-4xl font-bold text-center wrap-break-word text-wrap w-full">
                        {tracks[settings.singleTrackIndex]?.name}
                    </h1>
                    <span className="text-3xl flex items-center gap-3 font-semibold">
                        <svg
                            className="size-12"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Artist Icon</title>
                            <g clipPath="url(#clip0_429_11111)">
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="3"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.3414 20H6C4.89543 20 4 19.1046 4 18C4 15.7909 5.79086 14 8 14H13.5278"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20 18V11L22 13"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_429_11111">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>{" "}
                        {album.artists.map((artist) => artist.name).join(" , ")}
                    </span>
                    <span className="text-xl flex items-center gap-3 font-medium">
                        <Disc3 className="size-8" /> {album.name}
                    </span>
                    <span className="text-xl flex items-center gap-3 font-medium">
                        <CalendarDaysIcon className="size-8" />{" "}
                        {new Date(album.release_date).toLocaleDateString()}
                    </span>
                    {settings.showSpotifyCode && (
                        <div className="w-64 bottom-0">
                            <Image
                                src={`https://scannables.scdn.co/uri/plain/svg/FFFFFF/black/640/spotify:album:${album.id}`}
                                alt="Spotify Code"
                                width={640}
                                height={240}
                            />
                        </div>
                    )}
                    {settings.showWatermark && (
                        <div
                            className={`absolute text-lg flex items-center gap-2`}
                            style={{
                                bottom: `${settings.padding}px`,
                                right: `${settings.padding}px`,
                            }}
                        >
                            <span>
                                Made with{" "}
                                <span className="font-bold">Coverly</span>
                            </span>
                            <Image
                                src="/icon.svg"
                                alt="Watermark"
                                width={24}
                                height={24}
                            />{" "}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
