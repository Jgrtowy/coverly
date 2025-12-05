import React, { useEffect } from "react";
import type { Album } from "spotify-types";
import { useEditorStore } from "~/lib/store";
import { Button } from "./ui/button";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

export default function SettingsPanel({
    album,
    export: exportFunc,
}: {
    album: Album;
    export?: () => void;
}) {
    const { settings, setSettings } = useEditorStore();

    useEffect(() => {
        setSettings({
            ...settings,
            layout: album.album_type === "single" ? "single" : "list",
        });
    }, [album, setSettings]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent>
                    <ItemTitle>
                        <Label className="flex justify-between w-full">
                            Show Track Numbers
                        </Label>
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Switch
                        checked={settings.showTrackNumbers}
                        onCheckedChange={(checked) =>
                            setSettings({
                                ...settings,
                                showTrackNumbers: checked,
                            })
                        }
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent>
                    <ItemTitle>
                        <Label className="flex justify-between w-full">
                            Show Spotify code
                        </Label>
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Switch
                        checked={settings.showSpotifyCode}
                        onCheckedChange={(checked) =>
                            setSettings({
                                ...settings,
                                showSpotifyCode: checked,
                            })
                        }
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label htmlFor="font-size-slider" className="w-full">
                        Orientation
                    </Label>
                </ItemContent>
                <ItemActions>
                    <Select
                        value={settings.orientation}
                        onValueChange={(value) =>
                            setSettings({
                                ...settings,
                                orientation: value as "vertical" | "horizontal",
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Vertical" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="vertical">Vertical</SelectItem>
                            <SelectItem value="horizontal">
                                Horizontal
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label htmlFor="font-size-slider" className="w-full">
                        Layout
                    </Label>
                </ItemContent>
                <ItemActions>
                    <Select
                        value={settings.layout}
                        onValueChange={(value) =>
                            setSettings({
                                ...settings,
                                layout: value as "single" | "list",
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="list">List</SelectItem>
                        </SelectContent>
                    </Select>
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label htmlFor="font-size-slider" className="w-full">
                        Export
                    </Label>
                </ItemContent>
                <ItemActions>
                    <Button
                        variant="default"
                        className="cursor-pointer"
                        onClick={() => {
                            if (exportFunc) {
                                exportFunc();
                            }
                        }}
                    >
                        Export Album Art
                    </Button>
                </ItemActions>
            </Item>
        </div>
    );
}
