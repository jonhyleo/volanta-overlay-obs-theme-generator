export type ThemeVersion = 1;

export type OverlayTheme = {
	version: ThemeVersion;
	name: string;
	palette: {
		primary: string;
		secondary: string;
		tertiary: string;
		black: string;
		white: string;
	};
	appearance: {
		borderRadius: number;
		borderWidth: number;
		headerHeight: number;
		shadowBlur: number;
		shadowOpacity: number;
		progressHeight: number;
		progressRadius: number;
		skewOffset: number;
	};
};

export type StoredPreset = {
	id: string;
	theme: OverlayTheme;
	updatedAt: string;
};

export type FlightSnapshot = {
	origin: string;
	destination: string;
	speedKnots: number;
	verticalSpeedFpm: number;
	headingDegrees: number;
	altitudeFeet: number;
	atc: string;
	network: string;
	phase: string;
	eta: string;
	progressPercent: number;
};
