"use client";
import html2canvas from "html2canvas-pro";
import { Loader2, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import type { Album } from "spotify-types";
import DarkVeil from "~/components/DarkVeil";
import LightVeil from "~/components/LightVeil";
import Preview from "~/components/Preview";
import SettingsPanel from "~/components/SettingsPanel";
import { Button } from "~/components/ui/button";
import { useEditorStore } from "~/lib/store";

function EditorContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const [album, setAlbum] = useState<Album | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { settings, setSettings } = useEditorStore();
    const [exporting, setExporting] = useState(false);

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
                setIsLoading(false);
                setError("Failed to fetch album data");
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

    const handleExport = async () => {
        const node = document.getElementById("preview-capture");
        if (!node) return;
        setExporting(true);
        const tempColor = settings.bgColor;
        if (settings.bgColorOnlyOnPreview) {
            setSettings({
                ...settings,
                bgColor: "#ffffff",
            });
        }

        const prevTransform = node.style.transform;
        node.style.transform = "none";
        if (settings.bgColorOnlyOnPreview && settings.bgColor !== "#ffffff") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        const canvas = await html2canvas(node, {
            scale: 4,
            backgroundColor: "#ffffff",
            useCORS: true,
            windowWidth: node.scrollWidth,
            windowHeight: node.scrollHeight,
        });

        node.style.transform = prevTransform;

        const link = document.createElement("a");
        link.download = `${album?.name ? `${album.name}-coverly` : "album-coverly"}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        if (settings.bgColorOnlyOnPreview) {
            setSettings({
                ...settings,
                bgColor: tempColor,
            });
        }
        setExporting(false);
    };

    return (
        <>
            {isLoading && (
                <div className="text-5xl flex items-center gap-4">
                    <Loader2 className="size-12 animate-spin" />
                    Loading editor...
                </div>
            )}
            {!isLoading && !album && error && (
                <div className="text-2xl text-red-500">{error}</div>
            )}
            {!isLoading && album && (
                <>
                    <div
                        id="preview-scale-wrapper"
                        className="absolute overflow-hidden"
                        style={{
                            left: "-9999px",
                            top: "0",
                            width: "210mm",
                            height: "297mm",
                        }}
                    >
                        <div
                            id="preview-capture"
                            className="bg-white shadow-xl"
                            style={{
                                width: "210mm",
                                height: "297mm",
                                aspectRatio: "210 / 297",
                                transformOrigin: "top center",
                            }}
                        >
                            <Preview album={album} />
                        </div>
                    </div>
                    <div className="relative z-10 flex justify-between xl:flex-row flex-col gap-8 xl:h-[calc(100dvh-4rem)] max-h-dvh">
                        <div className="xl:w-1/2 w-full">
                            <SettingsPanel
                                album={album}
                                export={handleExport}
                                exporting={exporting}
                            />
                        </div>

                        <div className="xl:w-1/2 items-start justify-center overflow-visible">
                            <div className="h-full w-full flex items-start justify-center overflow-visible 2xl:scale-100 xl:scale-90 md:scale-100 scale-65 sm:scale-70">
                                <div
                                    className="bg-white shadow-xl"
                                    style={{
                                        width: "210mm",
                                        height: "297mm",
                                        aspectRatio: "210 / 297",
                                        transformOrigin: "top center",
                                    }}
                                >
                                    <Preview album={album} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
export default function page() {
    const { resolvedTheme } = useTheme();
    return (
        <div className="w-screen h-dvh p-4 gap-2">
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
            <Suspense
                fallback={
                    <div className="w-screen h-dvh p-4 gap-2 flex items-center justify-center">
                        <div className="text-5xl flex items-center gap-4">
                            <Loader2 className="size-12 animate-spin" />
                            Loading editor...
                        </div>
                    </div>
                }
            >
                <EditorContent />
            </Suspense>
            <div className="w-full h-full absolute left-0 top-0 -z-10">
                {resolvedTheme === "light" ? <LightVeil /> : <DarkVeil />}
            </div>
        </div>
    );
}
