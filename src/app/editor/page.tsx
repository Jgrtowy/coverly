"use client";
import html2canvas from "html2canvas-pro";
import { Loader2, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Album } from "spotify-types";
import DarkVeil from "~/components/DarkVeil";
import LightVeil from "~/components/LightVeil";
import Preview from "~/components/Preview";
import SettingsPanel from "~/components/SettingsPanel";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export default function page() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [album, setAlbum] = useState<Album | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { resolvedTheme } = useTheme();
    const [isLoadingPreview, setIsLoadingPreview] = useState(true);

    const fetchData = async (id: string | null) => {
        if (!id) return;
        try {
            setIsLoading(true);
            const response = await fetch("/api/spotify/album", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ albumId: id }),
            });

            if (!response.ok) {
                console.error("Failed to fetch album data");
                return;
            }

            const data = await response.json();
            setAlbum(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching album data:", error);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    useEffect(() => {
        const scale = () => {
            const wrapper = document.getElementById("preview-scale-wrapper");
            const preview = document.getElementById("preview-capture");
            if (!wrapper || !preview) return;

            const availableHeight =
                wrapper.parentElement?.clientHeight ?? wrapper.clientHeight;
            const previewHeight = preview.getBoundingClientRect().height;

            const scaleFactor = availableHeight / previewHeight;
            preview.style.transform = `scale(${Math.min(scaleFactor, 1)}) translateZ(0)`;
        };

        if (!album) return;

        const timer = setTimeout(scale, 150);

        window.addEventListener("resize", scale);
        setIsLoadingPreview(false);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", scale);
        };
    }, [album]);

    const handleExport = async () => {
        const node = document.getElementById("preview-capture");
        if (!node) return;

        const prevTransform = node.style.transform;
        node.style.transform = "none";

        const canvas = await html2canvas(node, {
            scale: 4,
            backgroundColor: "#ffffff",
            useCORS: true,
            windowWidth: node.scrollWidth,
            windowHeight: node.scrollHeight,
        });

        node.style.transform = prevTransform;

        const link = document.createElement("a");
        link.download = "preview-export.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    return (
        <div className="w-screen h-dvh p-4">
            {isLoading && (
                <div className="text-5xl flex items-center gap-4">
                    <Loader2 className="size-12 animate-spin" />
                    Loading editor...
                </div>
            )}
            {!isLoading && !album && (
                <div className="text-2xl text-red-500">
                    Failed to load album data. Please try again.
                </div>
            )}
            {!isLoading && album && (
                <div className="flex justify-between gap-8 h-[calc(100dvh-4rem)]">
                    <div className="w-1/2 overflow-y-auto">
                        <div className="flex gap-4 mb-2">
                            <Button
                                size="icon"
                                variant="default"
                                className="bg-destructive/40 hover:bg-destructive/50 text-primary"
                                asChild
                            >
                                <Link href="/">
                                    <X />
                                </Link>
                            </Button>
                        </div>
                        <SettingsPanel album={album} />
                    </div>

                    <div className="w-1/2 flex items-start justify-center overflow-visible">
                        {isLoadingPreview ? (
                            <Skeleton className="w-[210mm] h-[297mm] rounded shadow-xl" />
                        ) : (
                            <div
                                id="preview-scale-wrapper"
                                className="h-full w-full flex items-start justify-center overflow-visible"
                            >
                                <div
                                    id="preview-capture"
                                    className="bg-white shadow-xl"
                                    style={{
                                        width: "210mm", // A4 width
                                        height: "297mm", // A4 height
                                        aspectRatio: "210 / 297",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    <Preview album={album} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="w-full h-full absolute left-0 top-0 -z-10">
                {resolvedTheme === "light" ? <LightVeil /> : <DarkVeil />}
            </div>
        </div>
    );
}
