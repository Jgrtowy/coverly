import { useEffect, useState } from "react";
import { useAppStateStore } from "~/lib/store";

export default function SearchResults() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { searchQuery } = useAppStateStore();

    return <div></div>;
}
