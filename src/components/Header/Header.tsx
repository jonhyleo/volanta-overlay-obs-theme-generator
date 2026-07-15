import type { StoredPreset } from "../../theme/types";

interface Props {
	presetName: string;
	savedPresets: StoredPreset[];
	statusMessage: string;
}

export const Header = ({ presetName, savedPresets, statusMessage }: Props) => {
	console.log("Header Log: ", { presetName, savedPresets, statusMessage });
	return (
		<header className="grid gap-5 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur sm:grid-cols-[1.6fr_1fr] sm:p-8">
			<div className="space-y-4">
				<p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200/80"></p>
				<h1 className="max-w-3xl text-3xl font-black tracking-tight text-pretty text-white sm:text-5xl">Volanta Theme Builder for OBS</h1>
				<p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
					Build your own theme for Volanta's OBS browser source by customizing the palette and appearance settings.
				</p>
			</div>
			<div className="grid gap-3 rounded-3xl border border-emerald-300/15 bg-slate-950/40 p-5 text-sm text-slate-300">
				<div>
					<p className="font-semibold text-white">Workflow</p>
					<p className="mt-2">
						<ol className="list-inside list-decimal">
							<li>Adjust the controls.</li>
							<li>Copy the CSS.</li>
							<li>Paste it into the OBS browser source that renders the Volanta local HTML.</li>
						</ol>
					</p>
				</div>
				{/*
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Current output</p>
					<p className="mt-2 text-lg font-semibold text-white">CSS for OBS custom browser source</p>
				</div>
				<div className="grid grid-cols-2 gap-3">
					<div className="rounded-2xl border border-white/10 bg-white/5 p-3">
						<p className="text-xs uppercase tracking-[0.24em] text-slate-500">Preset</p>
						<p className="mt-1 font-semibold text-white">{presetName}</p>
					</div>
					<div className="rounded-2xl border border-white/10 bg-white/5 p-3">
						<p className="text-xs uppercase tracking-[0.24em] text-slate-500">Saved</p>
						<p className="mt-1 font-semibold text-white">{savedPresets.length} presets</p>
					</div>
				</div>
        */}
			</div>
		</header>
	);
};
