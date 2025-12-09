import { motion } from "motion/react";
import { useMemo } from "react";
import useSWR from "swr";
import { authClient } from "~/lib/auth-client";
import { useFavoritesStore } from "~/lib/store";
import { fetcher } from "~/lib/utils";
import AlbumCard from "./AlbumCard";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

export default function Greeting() {
    const { favorites, setFavorites } = useFavoritesStore();
    const { data: session } = authClient.useSession();

    const { isLoading } = useSWR(
        favorites.length === 0 ? "/api/spotify/top" : null,
        (url) =>
            fetcher(
                url,
                JSON.stringify({ limit: 10, time_range: "short_term" }),
            ),
        {
            onSuccess: (data) => {
                if (data && favorites.length === 0) {
                    setFavorites(data);
                }
            },
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        },
    );

    const memoizedFavorites = useMemo(() => favorites, [favorites]);

    const skeletonPlaceholders = useMemo(
        () => Array.from({ length: 20 }, (_, i) => i),
        [],
    );

    return (
        <div className="flex flex-col gap-2 mt-6">
            <h1 className="font-bold text-4xl">
                Welcome back, {session?.user?.name}
            </h1>
            <span className="text-xl text-muted-foreground">
                Your current favorites
            </span>
            <ScrollArea className="w-full rounded-md whitespace-nowrap overflow-auto">
                <div className="flex flex-row w-max space-x-4 p-4">
                    {isLoading &&
                        skeletonPlaceholders.map((index) => (
                            <motion.div
                                key={`skeleton-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.05,
                                    ease: "easeOut",
                                }}
                                className="flex flex-col gap-2"
                            >
                                <Skeleton className="w-48 h-48 rounded-lg" />
                            </motion.div>
                        ))}
                    {!isLoading &&
                        memoizedFavorites &&
                        memoizedFavorites.map((album, index) => (
                            <motion.div
                                key={`album-${album.id}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    ease: "easeOut",
                                }}
                            >
                                <AlbumCard album={album} />
                            </motion.div>
                        ))}
                    {!isLoading &&
                        memoizedFavorites &&
                        memoizedFavorites.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 text-muted-foreground"
                            >
                                No favorites found.
                            </motion.div>
                        )}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
