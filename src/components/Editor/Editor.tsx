import type { OverlayTheme } from "../../theme/types";
import { RotateCcw } from "lucide-react";

import Palette from "./components/Palette";
import Presets from "./components/Presets";
import Appearance from "./components/Appearance";
import PresetsGallery from "./components/PresetsGallery";

interface EditorProps {
	theme: OverlayTheme;
	setPaletteValue: (key: keyof OverlayTheme["palette"], value: string) => void;
	setAppearanceValue: (key: keyof OverlayTheme["appearance"], value: number) => void;
	resetTheme: () => void;
	presetName: string;
	setPresetName: (name: string) => void;
	savePreset: () => void;
	copyCss: () => void;
	exportTheme: () => void;
	importTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	importInputId: string;
	savedPresets: { id: string; theme: OverlayTheme; updatedAt: string }[];
	deletePreset: (id: string) => void;
	applyPreset: (preset: { id: string; theme: OverlayTheme; updatedAt: string }) => void;
}

const Editor = ({
	theme,
	setPaletteValue,
	setAppearanceValue,
	resetTheme,
	presetName,
	setPresetName,
	savePreset,
	copyCss,
	exportTheme,
	importTheme,
	fileInputRef,
	importInputId,
	savedPresets,
	deletePreset,
	applyPreset,
}: EditorProps) => {
	return (
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

			<Palette theme={theme} setPaletteValue={setPaletteValue} />

			<div className="grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
				<div className="space-y-3">
					<Presets
						presetName={presetName}
						setPresetName={setPresetName}
						savePreset={savePreset}
						copyCss={copyCss}
						exportTheme={exportTheme}
						importTheme={importTheme}
						fileInputRef={fileInputRef}
						importInputId={importInputId}
					/>

					<Appearance theme={theme} setAppearanceValue={setAppearanceValue} />
				</div>

				<PresetsGallery savedPresets={savedPresets} deletePreset={deletePreset} applyPreset={applyPreset} />
			</div>
		</section>
	);
};

export default Editor;
