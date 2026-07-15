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
	{
		id: "cyberpunk-neon",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: {
			version: 1,
			name: "Cyberpunk Neon",
			palette: {
				primary: "#ff007f", // Neon Pink
				secondary: "#0d001a", // Deep Space Violet
				tertiary: "#5b0080", // Electric Purple
				black: "#05000a", // Void Black
				white: "#ffe6f2", // Soft Pink-White
			},
			appearance: {
				borderRadius: 4, // Sharp, aggressive corners
				borderWidth: 5,
				headerHeight: 64,
				shadowBlur: 16, // Heavy "glowing" shadow
				shadowOpacity: 0.85,
				progressHeight: 14,
				progressRadius: 2,
				skewOffset: 30, // Heavy slant
			},
		},
	},
	{
		id: "forest-moss",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: {
			version: 1,
			name: "Forest Moss",
			palette: {
				primary: "#52b788", // Minty Green
				secondary: "#1b4332", // Dark Pine
				tertiary: "#40916c", // Soft Moss
				black: "#081c15", // Deep Forest Black
				white: "#f4f9f4", // Off-White Green
			},
			appearance: {
				borderRadius: 24, // Highly rounded, organic feel
				borderWidth: 3,
				headerHeight: 60,
				shadowBlur: 8, // Subtle, soft shadows
				shadowOpacity: 0.4,
				progressHeight: 8,
				progressRadius: 8,
				skewOffset: 30, // No slant for a clean, natural look
			},
		},
	},
	{
		id: "retro-sunset",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: {
			version: 1,
			name: "Retro Sunset",
			palette: {
				primary: "#ff7b00", // Sunset Orange
				secondary: "#3d0c02", // Burned Burgundy
				tertiary: "#ffb703", // Golden Yellow
				black: "#140502", // Warm Dark Charcoal
				white: "#fffdf0", // Warm Cream
			},
			appearance: {
				borderRadius: 12,
				borderWidth: 6, // Thicker borders for a retro comic-book style
				headerHeight: 66,
				shadowBlur: 14,
				shadowOpacity: 0.7,
				progressHeight: 12,
				progressRadius: 4,
				skewOffset: 28,
			},
		},
	},
	{
		id: "nordic-frost",
		updatedAt: "2026-04-14T00:00:00.000Z",
		theme: {
			version: 1,
			name: "Nordic Frost",
			palette: {
				primary: "#90e0ef", // Ice Blue
				secondary: "#2b2d42", // Deep Slate Blue
				tertiary: "#8d99ae", // Cool Steel Grey
				black: "#12141c", // Deep Midnight Blue
				white: "#f0f5fa", // Frosted White
			},
			appearance: {
				borderRadius: 8,
				borderWidth: 3,
				headerHeight: 58,
				shadowBlur: 6, // Very tight, clean shadows
				shadowOpacity: 0.3,
				progressHeight: 6,
				progressRadius: 3,
				skewOffset: 28, // Sleek, minimal slant
			},
		},
	},
];
