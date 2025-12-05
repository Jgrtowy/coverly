import { useAppStateStore } from "~/lib/store";
import Greeting from "./Greeting";
import Header from "./Header";
import SearchResults from "./SearchResults";

export default function HomePage() {
    const { searchQuery } = useAppStateStore();

    return (
        <div className="p-6">
            <Header />
            {searchQuery ? <SearchResults /> : <Greeting />}
        </div>
    );
}
