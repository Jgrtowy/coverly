import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useAppStateStore } from "~/lib/store";
import { Input } from "./ui/input";

export default function Searchbar() {
    const { searchQuery, setSearchQuery } = useAppStateStore();
    const [inputValue, setInputValue] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(inputValue);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputValue, setSearchQuery]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="relative h-10 w-full">
            <label htmlFor="search-input">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
            </label>
            <Input
                id="search-input"
                placeholder="Search..."
                className="border border-accent-foreground/20 bg-accent/50 dark:bg-accent-foreground/10 pl-10 w-full h-full"
                onChange={handleSearch}
                value={inputValue}
            />
        </div>
    );
}
