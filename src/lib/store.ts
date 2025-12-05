import type { Album } from "spotify-types";
import { create } from "zustand";

interface AppState {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

interface FavoritesState {
    favorites: Album[];
    setFavorites: (favorites: Album[]) => void;
}

interface EditorStore {
    settings: {
        showTrackNumbers: boolean;
        showSpotifyCode: boolean;
        showWatermark: boolean;
        layout: "single" | "list";
        orientation: "vertical" | "horizontal";
        tracks: number;
        padding: number;
    };
    setSettings: (settings: EditorStore["settings"]) => void;
}

export const useAppStateStore = create<AppState>((set) => ({
    searchQuery: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
}));

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
}));

export const useEditorStore = create<EditorStore>((set) => ({
    settings: {
        showTrackNumbers: true,
        showSpotifyCode: false,
        showWatermark: true,
        layout: "single",
        orientation: "vertical",
        tracks: 20,
        padding: 56,
    },
    setSettings: (settings) => set({ settings }),
}));
