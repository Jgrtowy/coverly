import type { Album } from "spotify-types";
import { create } from "zustand";

interface AppState {
    searchQuery: string;
    inputValue: string;
    setSearchQuery: (query: string) => void;
    setInputValue: (value: string) => void;
}

interface FavoritesState {
    favorites: Album[];
    setFavorites: (favorites: Album[]) => void;
}

interface EditorStore {
    settings: {
        customImage: string | null;
        showTrackNumbers: boolean;
        showSpotifyCode: boolean;
        showWatermark: boolean;
        layout: "single" | "list";
        tracks: number;
        padding: number;
        textColor: string;
        singleTrackIndex: number;
        bgColor: string;
        bgColorOnlyOnPreview: boolean;
        trackFontSize: number;
    };
    setSettings: (settings: EditorStore["settings"]) => void;
}

export const useAppStateStore = create<AppState>((set) => ({
    searchQuery: "",
    inputValue: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    setInputValue: (value) => set({ inputValue: value }),
}));

export const useFavoritesStore = create<FavoritesState>((set) => ({
    favorites: [],
    setFavorites: (favorites) => set({ favorites }),
}));

export const useEditorStore = create<EditorStore>((set) => ({
    settings: {
        customImage: null,
        showTrackNumbers: true,
        showSpotifyCode: false,
        showWatermark: true,
        layout: "single",
        singleTrackIndex: 0,
        tracks: 20,
        padding: 56,
        textColor: "#000000",
        bgColor: "#ffffff",
        bgColorOnlyOnPreview: true,
        trackFontSize: 14,
    },
    setSettings: (settings) => set({ settings }),
}));
