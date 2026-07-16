import { ArrowDownToLine, ArrowUpToLine, Copy, Save } from "lucide-react";

interface PresetsProps {
	presetName: string;
	setPresetName: (name: string) => void;
	savePreset: () => void;
	copyCss: () => void;
	exportTheme: () => void;
	importTheme: (event: React.ChangeEvent<HTMLInputElement>) => void;
	fileInputRef: React.RefObject<HTMLInputElement>;
	importInputId: string;
}

const Presets = ({ presetName, setPresetName, savePreset, copyCss, exportTheme, importTheme, fileInputRef, importInputId }: PresetsProps) => {
	return (
		<>
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
		</>
	);
};

export default Presets;
