import type { OverlayTheme } from "../../../theme/types";

interface AppearanceProps {
	theme: OverlayTheme;
	setAppearanceValue: (key: keyof OverlayTheme["appearance"], value: number) => void;
}

const Appearance = ({ theme, setAppearanceValue }: AppearanceProps) => {
	return (
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
					["skewOffset", "Skew offset", 0, 40, 1],
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
	);
};

export default Appearance;
