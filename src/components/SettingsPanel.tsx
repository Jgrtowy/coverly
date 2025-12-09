import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import type { Album, SimplifiedTrack } from "spotify-types";
import { z } from "zod";
import { useEditorStore } from "~/lib/store";
import MovingBorderButton from "./MovingBorderButton";
import { Input } from "./ui/input";
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

const urlSchema = z.string().url().or(z.literal(""));

export default function SettingsPanel({
    album,
    export: exportFunc,
}: {
    album: Album;
    export: () => void;
}) {
    const { settings, setSettings } = useEditorStore();
    const [inputValue, setInputValue] = useState(settings.customImage ?? "");
    const tracks = (album as { tracks: { items: SimplifiedTrack[] } }).tracks
        .items;

    useEffect(() => {
        setSettings({
            ...settings,
            layout: album.album_type === "single" ? "single" : "list",
        });
    }, [album, setSettings]);

    useEffect(() => {
        setInputValue(settings.customImage ?? "");
    }, [settings.customImage]);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent>
                    <ItemTitle>
                        <Label className="flex justify-between w-full">
                            Custom Image URL
                        </Label>
                    </ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Input
                        value={inputValue}
                        placeholder="https://..."
                        onChange={(e) => {
                            const value = e.target.value;
                            setInputValue(value);

                            const result = urlSchema.safeParse(value);
                            if (result.success) {
                                setSettings({
                                    ...settings,
                                    customImage: value || null,
                                });
                            }
                        }}
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
                    <Label className="w-full">Show Watermark</Label>
                </ItemContent>
                <ItemActions>
                    <Switch
                        checked={settings.showWatermark}
                        onCheckedChange={(checked) =>
                            setSettings({
                                ...settings,
                                showWatermark: checked,
                            })
                        }
                    />
                </ItemActions>
            </Item>

            <Item
                variant="outline"
                className="bg-background/50 h-20 flex w-full"
            >
                <ItemContent className="flex flex-col gap-1 max-w-1/4">
                    <Label className="w-full">Layout</Label>
                </ItemContent>
                <ItemActions className="flex justify-end w-3/4">
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
                    <Select
                        value={settings.singleTrackIndex.toString()}
                        onValueChange={(value) =>
                            setSettings({
                                ...settings,
                                singleTrackIndex: Number(value),
                            })
                        }
                        disabled={settings.layout !== "single"}
                    >
                        <SelectTrigger className="max-w-1/2">
                            <SelectValue className="line-clamp-1 truncate" />
                        </SelectTrigger>
                        <SelectContent>
                            {tracks.map((track, index) => (
                                <SelectItem
                                    key={track.id}
                                    value={index.toString()}
                                >
                                    {track.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent>
                    <ItemTitle>
                        <Label className="flex justify-between w-full">
                            Show Track Numbers (only in list layout)
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
                        disabled={settings.layout !== "list"}
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label htmlFor="padding-size-slider" className="w-full">
                        Track Font Size ({settings.trackFontSize}px) (only in
                        list layout)
                    </Label>
                </ItemContent>
                <ItemActions className="w-1/4">
                    <Slider
                        id="padding-size-slider"
                        value={[settings.trackFontSize]}
                        onValueChange={([value]) =>
                            setSettings({
                                ...settings,
                                trackFontSize: value,
                            })
                        }
                        min={8}
                        max={36}
                        step={1}
                        disabled={settings.layout !== "list"}
                    />
                </ItemActions>
            </Item>

            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label htmlFor="tracks-slider" className="w-full">
                        Tracks ({settings.tracks}) (only in list layout)
                    </Label>
                </ItemContent>
                <ItemActions className="w-1/4">
                    <Slider
                        id="tracks-slider"
                        value={[settings.tracks]}
                        onValueChange={([value]) =>
                            setSettings({
                                ...settings,
                                tracks: value,
                            })
                        }
                        min={1}
                        max={tracks.length}
                        step={1}
                        disabled={settings.layout !== "list"}
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label htmlFor="padding-size-slider" className="w-full">
                        Padding ({settings.padding}px)
                    </Label>
                </ItemContent>
                <ItemActions className="w-1/4">
                    <Slider
                        id="padding-size-slider"
                        value={[settings.padding]}
                        onValueChange={([value]) =>
                            setSettings({
                                ...settings,
                                padding: value,
                            })
                        }
                        min={0}
                        max={100}
                        step={1}
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label className="w-full">Text Color</Label>
                </ItemContent>
                <ItemActions>
                    <Input
                        className="aspect-square w-14"
                        type="color"
                        value={settings.textColor}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                textColor: e.target.value,
                            })
                        }
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50 h-20">
                <ItemContent className="flex flex-col gap-1">
                    <Label className="w-full">Background Color</Label>
                </ItemContent>
                <ItemActions>
                    Preview Only
                    <Switch
                        checked={settings.bgColorOnlyOnPreview}
                        onCheckedChange={(checked) =>
                            setSettings({
                                ...settings,
                                bgColorOnlyOnPreview: checked,
                            })
                        }
                    />
                    <span className="mx-2">|</span>
                    <Input
                        className="aspect-square w-14"
                        type="color"
                        value={settings.bgColor}
                        onChange={(e) =>
                            setSettings({
                                ...settings,
                                bgColor: e.target.value,
                            })
                        }
                    />
                </ItemActions>
            </Item>
            <Item variant="outline" className="bg-background/50">
                <ItemContent className="flex flex-col gap-1">
                    Export!
                </ItemContent>
                <ItemActions>
                    <MovingBorderButton
                        className="w-full bg-background hover:bg-background/90 cursor-pointer"
                        onClick={() => exportFunc()}
                    >
                        <div className="flex items-center gap-2">
                            <Rocket />
                            Export Poster
                        </div>
                    </MovingBorderButton>
                </ItemActions>
            </Item>
        </div>
    );
}
