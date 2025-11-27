import { type NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    const token = await auth.api.getAccessToken({
        body: { providerId: "spotify" },
        headers: request.headers,
    });

    const data = await fetch(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50",
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token.accessToken}`,
                "Content-Type": "application/json",
            },
        },
    ).then((res) => res.json());

    // biome-ignore lint/suspicious/noExplicitAny: i aint typing all that
    const filtered = data.items.map((item: any) => ({
        id: item.album.id,
        album_type: item.album.album_type,
        name: item.album.name,
        artist: item.album.artists[0].name,
        imageUrl: item.album.images[0].url,
    })) as Album[];

    const uniqueAlbums = Array.from(
        new Map(
            filtered
                // biome-ignore lint/suspicious/noExplicitAny: also this
                .map((item: any) => [item.name, item]),
        ).values(),
    );

    return new NextResponse(JSON.stringify(uniqueAlbums), { status: 200 });
}
