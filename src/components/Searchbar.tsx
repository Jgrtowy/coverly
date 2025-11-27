import { Search } from "lucide-react";
import { useAppStateStore } from "~/lib/store";
import { Input } from "./ui/input";

export default function Searchbar() {
    const { searchQuery, setSearchQuery } = useAppStateStore();

    return (
        <div className="relative h-10 w-full">
            <label htmlFor="search-input">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
            </label>
            <Input
                id="search-input"
                placeholder="Search..."
                className="border border-accent-foreground/20 bg-accent/50 dark:bg-accent-foreground/10 pl-10 w-full h-full"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />
        </div>
    );
}
