import { NextResponse } from "next/server";
import type { Album, Track } from "spotify-types";
import { auth } from "~/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const token = await auth.api.getAccessToken({
        body: { providerId: "spotify" },
        headers: request.headers,
    });

    const { query } = await request.json();

    const res = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=album,track&market=US&limit=20`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
            },
        },
    );

    if (!res.ok) {
        return new NextResponse(JSON.stringify([]), { status: res.status });
    }

    const data = await res.json();

    if (!data.albums) {
        return new NextResponse(JSON.stringify([]), { status: 200 });
    }
    const filtered = data.albums.items.map((item: Album) => ({
        id: item.id,
        album_type: item.album_type,
        name: item.name,
        artists: item.artists,
        images: item.images,
    })) as Album[];

    filtered.push(
        ...data.tracks.items.map((item: Track) => ({
            id: item.album.id,
            album_type: item.album.album_type,
            name: item.album.name,
            artists: item.album.artists,
            images: item.album.images,
        })),
    );

    const uniqueAlbums = Array.from(
        new Map(filtered.map((item: Album) => [item.name, item])).values(),
    );

    return new NextResponse(JSON.stringify(uniqueAlbums), { status: 200 });
}
