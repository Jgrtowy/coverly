import { create } from "zustand";

interface AppState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

interface FavoritesState {
    favorites: Album[];
    setFavorites: (favorites: Album[]) => void;
}

export const useAppStateStore = create<AppState>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
}));
