import type { OverlayTheme, StoredPreset } from "./types";

export const THEME_STORAGE_KEY = "volanta-overlay-theme-current";
export const PRESET_STORAGE_KEY = "volanta-overlay-theme-presets";

export const defaultTheme: OverlayTheme = {
	version: 1,
	name: "Volanta Amber",
	palette: {
		primary: "#ff7900",
		secondary: "#3d3d3d",
		tertiary: "#ff7900",
		black: "#000000",
		white: "#ffffff",
	},
	appearance: {
		borderRadius: 10,
		borderWidth: 5,
		headerHeight: 60,
		shadowBlur: 6,
		shadowOpacity: 0.75,
		progressHeight: 11,
		progressRadius: 6,
		skewOffset: 30,
	},
};

export const starterPresets: StoredPreset[] = [
	{
		id: "volanta-amber",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: defaultTheme,
	},
	{
		id: "night-vector",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: {
			version: 1,
			name: "Night Vector",
			palette: {
				primary: "#35c2ff",
				secondary: "#14253f",
				tertiary: "#1d4f91",
				black: "#02050a",
				white: "#f4fbff",
			},
			appearance: {
				borderRadius: 14,
				borderWidth: 4,
				headerHeight: 64,
				shadowBlur: 12,
				shadowOpacity: 0.68,
				progressHeight: 12,
				progressRadius: 6,
				skewOffset: 28,
			},
		},
	},
	{
		id: "coastal-atc",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: {
			version: 1,
			name: "Coastal ATC",
			palette: {
				primary: "#3ccfcf",
				secondary: "#173a44",
				tertiary: "#2a6f86",
				black: "#041114",
				white: "#f5ffff",
			},
			appearance: {
				borderRadius: 18,
				borderWidth: 4,
				headerHeight: 62,
				shadowBlur: 10,
				shadowOpacity: 0.64,
				progressHeight: 10,
				progressRadius: 5,
				skewOffset: 32,
			},
		},
	},
];
