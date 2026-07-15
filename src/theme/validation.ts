import type { OverlayTheme } from "./types";

const isHexColor = (value: unknown): value is string => typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);

const isNumberInRange = (value: unknown, min: number, max: number) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;

export const isOverlayTheme = (value: unknown): value is OverlayTheme => {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;
	const palette = candidate.palette as Record<string, unknown> | undefined;
	const appearance = candidate.appearance as Record<string, unknown> | undefined;

	if (candidate.version !== 1 || typeof candidate.name !== "string" || !palette || !appearance) {
		return false;
	}

	return (
		isHexColor(palette.primary) &&
		isHexColor(palette.secondary) &&
		isHexColor(palette.tertiary) &&
		isHexColor(palette.black) &&
		isHexColor(palette.white) &&
		isNumberInRange(appearance.borderRadius, 0, 32) &&
		isNumberInRange(appearance.borderWidth, 0, 10) &&
		isNumberInRange(appearance.headerHeight, 40, 90) &&
		isNumberInRange(appearance.shadowBlur, 0, 24) &&
		isNumberInRange(appearance.shadowOpacity, 0, 1) &&
		isNumberInRange(appearance.progressHeight, 4, 20) &&
		isNumberInRange(appearance.progressRadius, 0, 12) &&
		isNumberInRange(appearance.skewOffset, 12, 48)
	);
};

export const parseImportedTheme = (rawJson: string) => {
	const parsed = JSON.parse(rawJson) as unknown;

	if (!isOverlayTheme(parsed)) {
		throw new Error("The imported file does not contain a valid Volanta overlay theme.");
	}

	return parsed;
};
