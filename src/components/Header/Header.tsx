import type { StoredPreset } from "../../theme/types";

interface Props {
	presetName: string;
	savedPresets: StoredPreset[];
	statusMessage: string;
}

const Header = ({ presetName, savedPresets, statusMessage }: Props) => {
	console.log("Header rendered with props:", { presetName, savedPresets, statusMessage });
	return (
		<header className="grid gap-5 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur sm:grid-cols-[1.6fr_1fr] sm:p-8">
			<div className="space-y-4">
				<p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-200/80"></p>
				<h1 className="font-manrope font-extralight max-w-3xl text-3xl tracking-tight text-pretty text-white sm:text-5xl">
					<span className="font-bold">Volanta Theme Builder</span> for OBS
				</h1>
				<p className="font-general max-w-2xl text-sm leading-6 text-slate-300/75 sm:text-base">
					Build your own theme for Volanta's OBS browser source by customizing the palette and appearance settings.
				</p>
			</div>
			<div className="grid gap-3 rounded-3xl border border-emerald-300/15 bg-slate-950/40 p-5 text-sm text-slate-300/75">
				<div>
					<p className="font-manrope font-semibold text-xl text-white">Workflow</p>
					<div className="mt-2">
						<ol className="font-general list-inside list-decimal">
							<li>Adjust the controls.</li>
							<li>Copy the CSS.</li>
							<li>Paste it into the OBS browser source that renders the Volanta local HTML.</li>
						</ol>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
