import { NextResponse } from "next/server";
import type { Album } from "spotify-types";
import { auth } from "~/lib/auth";

export async function POST(request: Request) {
    const token = await auth.api.getAccessToken({
        body: { providerId: "spotify" },
        headers: request.headers,
    });

    const { albumId } = await request.json();

    const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return new NextResponse(null, { status: res.status });
    }

    const data = (await res.json()) as Album;
    console.log(data);

    return new NextResponse(JSON.stringify(data), { status: 200 });
}
