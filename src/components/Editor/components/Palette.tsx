import type { OverlayTheme } from "../../../theme/types";

interface PaletteProps {
	theme: OverlayTheme;
	setPaletteValue: (key: keyof OverlayTheme["palette"], value: string) => void;
}

const Palette = ({ theme, setPaletteValue }: PaletteProps) => {
	return (
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
	);
};

export default Palette;
