import { motion } from "motion/react";
import { useEffect, useState } from "react";
import type { Album } from "spotify-types";
import { useAppStateStore } from "~/lib/store";
import AlbumCard from "./AlbumCard";
import { Skeleton } from "./ui/skeleton";

export default function SearchResults() {
    const [results, setResults] = useState<Album[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error] = useState<string | null>(null);

    const { searchQuery } = useAppStateStore();

    useEffect(() => {
        if (!searchQuery) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            setIsLoading(true);
            const response = await fetch("/api/spotify/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: searchQuery }),
            });
            if (!response.ok) {
                setResults([]);
                setIsLoading(false);
                return;
            }
            const data = (await response.json()) as Album[];
            setResults(data);
            setIsLoading(false);
        };
        fetchResults();
    }, [searchQuery]);
    return (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 justify-items-center gap-4">
            {isLoading &&
                Array.from({ length: 12 }).map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Skeleton className="w-48 h-48 rounded-md aspect-square" />
                    </motion.div>
                ))}
            {!isLoading &&
                results.map((album, index) => (
                    <motion.div
                        key={album.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <AlbumCard key={album.id} album={album} />
                    </motion.div>
                ))}
            {!isLoading && results.length === 0 && searchQuery && (
                <p className="text-center col-span-full text-muted-foreground">
                    No results found.
                </p>
            )}
            {!isLoading && error && (
                <p className="text-center col-span-full text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}
