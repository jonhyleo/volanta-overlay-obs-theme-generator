import type { OverlayTheme } from "../../../theme/types";
import { BadgeInfo, Check } from "lucide-react";

interface PresetsGalleryProps {
	savedPresets: { id: string; theme: OverlayTheme; updatedAt: string }[];
	deletePreset: (id: string) => void;
	applyPreset: (preset: { id: string; theme: OverlayTheme; updatedAt: string }) => void;
}

const PresetsGallery = ({ savedPresets, deletePreset, applyPreset }: PresetsGalleryProps) => {
	return (
		<div className="space-y-3 bg-amber-50/5 px-4 py-3 rounded-2xl border border-white/10">
			<div className="flex items-center justify-between gap-4 ">
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
			<div className="grid gap-3 xl:grid-cols-3">
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
								className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 px-2 py-1 transition hover:text-rose-300 hover:bg-rose-300/10 rounded-lg "
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
	);
};

export default PresetsGallery;
