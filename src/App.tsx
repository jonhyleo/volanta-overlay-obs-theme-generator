import { useEffect, useId, useMemo, useRef, useState } from "react";

import { Header } from "./components/Header/Header";

import { mockFlight } from "./data/mockFlight";
import { buildPreviewDocument } from "./preview/buildPreviewDocument";
import { defaultTheme, PRESET_STORAGE_KEY, starterPresets, THEME_STORAGE_KEY } from "./theme/defaults";
import { themeToCss } from "./theme/css";
import { isOverlayTheme, parseImportedTheme } from "./theme/validation";
import type { OverlayTheme, StoredPreset } from "./theme/types";
import { ArrowDownToLine, ArrowUpToLine, Check, Copy, BadgeInfo, RotateCcw, Save } from "lucide-react";
import { Livepreview } from "./components/LivePreview/Livepreview";

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

				<Livepreview previewDocument={previewDocument} />

				<main className="">
					<section className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/40 p-5 mb-8 shadow-[0_30px_80px_rgba(2,6,23,0.2)] backdrop-blur">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Editor</p>
								<h2 className="mt-2 text-xl font-bold text-white">Theme controls</h2>
							</div>
							<button
								type="button"
								onClick={resetTheme}
								className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/30 hover:bg-white/5"
							>
								<RotateCcw size={16} />
								Reset
							</button>
						</div>

						<div className="flex items center justify-between gap-4">
							<div className="space-y-3 w-full">
								<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Palette</p>
								<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
									{[
										["primary", "Primary"],
										["secondary", "Secondary"],
										["tertiary", "Tertiary"],
										["black", "Black"],
										["white", "White"],
									].map(([key, label]) => (
										<label key={key} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/3 px-3 py-3">
											<input
												type="color"
												value={theme.palette[key as keyof OverlayTheme["palette"]]}
												onChange={(event) => setPaletteValue(key as keyof OverlayTheme["palette"], event.target.value)}
												className="h-11 w-11 rounded-xl border border-white/10 bg-transparent"
											/>
											<div className="min-w-0 flex-1">
												<p className="text-sm font-semibold text-white">{label}</p>
												<p className="text-xs uppercase tracking-[0.2em] text-slate-500">{theme.palette[key as keyof OverlayTheme["palette"]]}</p>
											</div>
										</label>
									))}
								</div>
							</div>
						</div>

						<div className="grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
							<div className="space-y-3">
								<label className="block text-xs font-semibold uppercase tracking-[0.24em] text-slate-400" htmlFor="preset-name">
									Preset name
								</label>
								<input
									id="preset-name"
									value={presetName}
									onChange={(event) => setPresetName(event.target.value)}
									className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-300/50"
								/>
								<div className="grid grid-cols-2 gap-3">
									<button
										type="button"
										onClick={savePreset}
										className="flex items-center justify-center gap-1 rounded-2xl bg-emerald-300 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-200"
									>
										<Save size={16} />
										Save preset
									</button>
									<button
										type="button"
										onClick={copyCss}
										className="flex items-center justify-center gap-1 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200/35 hover:bg-emerald-300/15"
									>
										<Copy size={16} />
										Copy CSS
									</button>
									<button
										type="button"
										onClick={exportTheme}
										className="flex items-center justify-center gap-1 rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
									>
										<ArrowUpToLine size={16} />
										Export JSON
									</button>
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										className="flex items-center justify-center gap-1 rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
									>
										<ArrowDownToLine size={16} />
										Import JSON
									</button>
								</div>
								<input id={importInputId} ref={fileInputRef} type="file" accept="application/json" onChange={importTheme} className="hidden" />

								<div className="space-y-3">
									<div className="flex items-center justify-between gap-4">
										<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400 inline-block">Presets</p>
										<p className="text-xs text-slate-500">
											<div className="group relative inline-block">
												<button className="">
													<BadgeInfo size={12} />
												</button>

												<div className="absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 scale-75 opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 pointer-events-none">
													<div className="rounded bg-gray-900 px-2 py-1 text-xs text-white shadow-lg">Stored in localStorage</div>
													<div className="absolute top-full left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1 bg-gray-900 rotate-45"></div>
												</div>
											</div>
										</p>
									</div>
									<div className="grid gap-3">
										{savedPresets.map((preset) => (
											<div key={preset.id} className="rounded-2xl border border-white/10 bg-white/3 p-4">
												<div className="flex items-start justify-between gap-3">
													<div>
														<p className="font-semibold text-white">{preset.theme.name}</p>
														<p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">{new Date(preset.updatedAt).toLocaleDateString()}</p>
													</div>
													<button
														type="button"
														onClick={() => deletePreset(preset.id)}
														className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-rose-300"
													>
														Delete
													</button>
												</div>
												<button
													type="button"
													onClick={() => applyPreset(preset)}
													className="flex items-center justify-center gap-2 mt-4 w-full rounded-2xl border border-white/12 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-200/35 hover:bg-emerald-300/10"
												>
													<Check size={16} />
													Apply preset
												</button>
											</div>
										))}
									</div>
								</div>
							</div>

							<div className="space-y-3">
								<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Appearance</p>
								<div className="grid xl:grid-cols-2 gap-4">
									{[
										["borderRadius", "Border radius", 0, 32, 1],
										["borderWidth", "Border width", 0, 10, 1],
										["headerHeight", "Header height", 40, 90, 1],
										["shadowBlur", "Shadow blur", 0, 24, 1],
										["shadowOpacity", "Shadow opacity", 0, 1, 0.01],
										["progressHeight", "Progress height", 4, 20, 1],
										["progressRadius", "Progress radius", 0, 12, 1],
									].map(([key, label, min, max, step]) => (
										<label key={key} className="rounded-2xl border border-white/10 bg-white/3 p-4">
											<div className="mb-1 flex items-center justify-between">
												<span className="text-sm font-semibold text-white">{label}</span>
												<span className="text-xs uppercase tracking-[0.2em] text-slate-500">{theme.appearance[key as keyof OverlayTheme["appearance"]]}</span>
											</div>
											<input
												type="range"
												min={min}
												max={max}
												step={step}
												value={theme.appearance[key as keyof OverlayTheme["appearance"]]}
												onChange={(event) => setAppearanceValue(key as keyof OverlayTheme["appearance"], Number(event.target.value))}
												className="w-full accent-emerald-300"
											/>
										</label>
									))}
								</div>
							</div>
						</div>
					</section>

					<section className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/40 p-5 mt-8 backdrop-blur">
						<div className="flex items-end justify-between gap-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Output</p>
								<h2 className="mt-2 text-xl font-bold text-white">Generated CSS</h2>
							</div>
							<button
								type="button"
								onClick={copyCss}
								className="flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 transition hover:border-emerald-200/35 hover:bg-emerald-300/15"
							>
								<Copy size={16} />
								Copy to clipboard
							</button>
						</div>

						<textarea
							readOnly
							value={cssOutput}
							className="min-h-130 w-full rounded-3xl border border-white/10 bg-[#02050a] px-4 py-4 font-mono text-[12px] leading-6 text-emerald-100 outline-none resize-none"
						/>
					</section>
				</main>
			</div>
		</div>
	);
}

export default App;
