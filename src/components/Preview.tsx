import Image from "next/image";
import React from "react";
import type { Album, SimplifiedTrack } from "spotify-types";
import { useEditorStore } from "~/lib/store";
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

    return (
        <div
            className="w-[210mm] h-[297mm] bg-white flex flex-col gap-4 overflow-hidden text-black relative"
            style={{ padding: `${settings.padding}px` }}
        >
            <div>
                {album.images[0] && (
                    <Image
                        src={album.images[0].url}
                        alt={album.name}
                        width={1200}
                        height={1200}
                    />
                )}
            </div>
            <div className="space-y-2">
                <Separator className="h-1 bg-black" />
                <div className="flex justify-between">
                    <div className="flex flex-col items-start w-full">
                        <h1 className="text-4xl font-bold">{album.name}</h1>
                        <h2 className="text-3xl">
                            {album.artists
                                .map((artist) => artist.name)
                                .join(", ")}
                        </h2>
                    </div>
                    <div className="flex flex-col items-end w-[40%]">
                        <h1>
                            {new Date(album.release_date).toLocaleDateString(
                                "en-us",
                                {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                },
                            )}
                        </h1>
                    </div>
                </div>
                <Separator className="h-1 bg-black" />
            </div>
            {/* <div
                className="mt-4 grid max-w-full"
                style={{
                    gridAutoFlow: "column",
                    gridTemplateRows: "repeat(10, minmax(0, 1fr))",
                }}
            >
                {tracks.slice(0, 40).map((track, index) => (
                    <div key={track.id} className="flex gap-2 text-sm">
                        <span className="w-6 text-right tabular-nums">
                            {index + 1}.
                        </span>
                        <span className="line-clamp-1">{track.name}</span>
                    </div>
                ))}
            </div> */}
            <div className="max-w-full flex flex-col flex-wrap overflow-y-auto ">
                {tracks.slice(0, settings.tracks).map((track, index) => (
                    <div
                        key={track.id}
                        className="flex max-w-fit gap-2 text-sm"
                    >
                        <span className="w-4 tabular-nums font-mono font-bold">
                            {(index + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="max-w-72 truncate">{track.name}</span>
                    </div>
                ))}
            </div>
            {settings.showSpotifyCode && (
                <div className="absolute bottom-10 right-10 flex flex-col items-center w-64">
                    {/* <a
                        href={`http://scannables.scdn.co/uri/plain/svg/FFFFFF/black/640/spotify:album:${album.id}`}
                        target="_blank"
                    >
                        code
                    </a> */}
                    <Image
                        src={`https://scannables.scdn.co/uri/plain/svg/FFFFFF/black/640/spotify:album:${album.id}`}
                        alt="Spotify Code"
                        width={640}
                        height={240}
                    />
                </div>
            )}
        </div>
    );
}
