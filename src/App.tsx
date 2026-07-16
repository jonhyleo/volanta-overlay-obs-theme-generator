import { useEffect, useId, useMemo, useRef, useState } from "react";

import { mockFlight } from "./data/mockFlight";
import { buildPreviewDocument } from "./preview/buildPreviewDocument";
import { defaultTheme, PRESET_STORAGE_KEY, starterPresets, THEME_STORAGE_KEY } from "./theme/defaults";
import { themeToCss } from "./theme/css";
import { isOverlayTheme, parseImportedTheme } from "./theme/validation";
import type { OverlayTheme, StoredPreset } from "./theme/types";

import Header from "./components/Header/Header";
import Livepreview from "./components/LivePreview/Livepreview";
import Editor from "./components/Editor/Editor";
import Output from "./components/Output/Output";

const cloneTheme = (theme: OverlayTheme): OverlayTheme => structuredClone(theme);

const createPresetId = (name: string) =>
	`${name
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;

const isStoredPreset = (value: unknown): value is StoredPreset => {
	if (typeof value !== "object" || value === null) {
		return false;
	}

	const candidate = value as Record<string, unknown>;

	return typeof candidate.id === "string" && typeof candidate.updatedAt === "string" && isOverlayTheme(candidate.theme);
};

function App() {
	const importInputId = useId();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [theme, setTheme] = useState<OverlayTheme>(defaultTheme);
	const [savedPresets, setSavedPresets] = useState<StoredPreset[]>(starterPresets);
	const [presetName, setPresetName] = useState(defaultTheme.name);
	const [statusMessage, setStatusMessage] = useState("Ready. Adjust the theme and copy the generated CSS.");

	useEffect(() => {
		const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
		const storedPresets = window.localStorage.getItem(PRESET_STORAGE_KEY);

		if (storedTheme) {
			try {
				const parsedTheme = parseImportedTheme(storedTheme);
				setTheme(parsedTheme);
				setPresetName(parsedTheme.name);
			} catch {
				window.localStorage.removeItem(THEME_STORAGE_KEY);
			}
		}

		if (storedPresets) {
			try {
				const parsed = JSON.parse(storedPresets) as unknown;
				const validPresets = Array.isArray(parsed) ? parsed.filter(isStoredPreset) : [];

				if (validPresets.length > 0) {
					setSavedPresets(validPresets);
				}
			} catch {
				window.localStorage.removeItem(PRESET_STORAGE_KEY);
			}
		}
	}, []);

	useEffect(() => {
		window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
	}, [theme]);

	useEffect(() => {
		window.localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(savedPresets));
	}, [savedPresets]);

	const cssOutput = useMemo(() => themeToCss(theme), [theme]);
	const previewDocument = useMemo(() => buildPreviewDocument(cssOutput, mockFlight), [cssOutput]);

	const setPaletteValue = (key: keyof OverlayTheme["palette"], value: string) => {
		setTheme((currentTheme) => ({
			...currentTheme,
			palette: {
				...currentTheme.palette,
				[key]: value,
			},
		}));
	};

	const setAppearanceValue = (key: keyof OverlayTheme["appearance"], value: number) => {
		setTheme((currentTheme) => ({
			...currentTheme,
			appearance: {
				...currentTheme.appearance,
				[key]: value,
			},
		}));
	};

	const applyPreset = (preset: StoredPreset) => {
		setTheme(cloneTheme(preset.theme));
		setPresetName(preset.theme.name);
		setStatusMessage(`Applied preset: ${preset.theme.name}`);
	};

	const savePreset = () => {
		const name = presetName.trim() || "Custom preset";
		const nextPreset: StoredPreset = {
			id: createPresetId(name),
			updatedAt: new Date().toISOString(),
			theme: {
				...cloneTheme(theme),
				name,
			},
		};

		setTheme((currentTheme) => ({
			...currentTheme,
			name,
		}));
		setSavedPresets((currentPresets) => [nextPreset, ...currentPresets]);
		setStatusMessage(`Saved preset: ${name}`);
	};

	const deletePreset = (presetId: string) => {
		setSavedPresets((currentPresets) => currentPresets.filter((preset) => preset.id !== presetId));
		setStatusMessage("Preset removed from local storage.");
	};

	const resetTheme = () => {
		setTheme(cloneTheme(defaultTheme));
		setPresetName(defaultTheme.name);
		setStatusMessage("Reset to the default theme.");
	};

	const copyCss = async () => {
		try {
			await navigator.clipboard.writeText(cssOutput);
			setStatusMessage("Generated CSS copied to clipboard.");
		} catch {
			setStatusMessage("Clipboard access is unavailable. Select the CSS manually and copy it from the output panel.");
		}
	};

	const exportTheme = () => {
		const payload = JSON.stringify(
			{
				...theme,
				name: presetName.trim() || theme.name,
			},
			null,
			2,
		);
		const blob = new Blob([payload], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${(presetName.trim() || theme.name).toLowerCase().replace(/[^a-z0-9]+/g, "-")}.json`;
		link.click();
		URL.revokeObjectURL(url);
		setStatusMessage("Preset exported as JSON.");
	};

	const importTheme = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) {
			return;
		}

		try {
			const rawJson = await file.text();
			const importedTheme = parseImportedTheme(rawJson);
			setTheme(importedTheme);
			setPresetName(importedTheme.name);
			setStatusMessage(`Imported preset: ${importedTheme.name}`);
		} catch (error) {
			setStatusMessage(error instanceof Error ? error.message : "Unable to import preset.");
		} finally {
			event.target.value = "";
		}
	};

	return (
		<div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(75,210,180,0.12),transparent_35%),linear-gradient(180deg,#09111d_0%,#03060b_100%)] text-slate-100">
			<div className="container mx-auto flex min-h-screen flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
				<Header presetName={presetName} savedPresets={savedPresets} statusMessage={statusMessage} />

				<main>
					<Livepreview previewDocument={previewDocument} />

					<Editor
						theme={theme}
						setPaletteValue={setPaletteValue}
						setAppearanceValue={setAppearanceValue}
						resetTheme={resetTheme}
						presetName={presetName}
						setPresetName={setPresetName}
						savePreset={savePreset}
						copyCss={copyCss}
						exportTheme={exportTheme}
						importTheme={importTheme}
						fileInputRef={fileInputRef as React.RefObject<HTMLInputElement>}
						importInputId={importInputId}
						savedPresets={savedPresets}
						deletePreset={deletePreset}
						applyPreset={applyPreset}
					/>

					<Output cssOutput={cssOutput} copyCss={copyCss} />
				</main>
			</div>
		</div>
	);
}

export default App;
