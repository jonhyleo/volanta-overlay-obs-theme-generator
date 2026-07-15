interface Props {
	previewDocument: string;
}
export const Livepreview = ({ previewDocument }: Props) => {
	return (
		<section className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/35 p-5 backdrop-blur sticky top-0 z-10 sticky:border-t-rounded-0">
			<div className="flex items-end justify-between gap-4">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Live Preview</p>
				</div>
			</div>

			<iframe
				title="Volanta overlay live preview"
				className="w-full rounded-[22px] border border-white/8 bg-transparent select-none pointer-events-none"
				srcDoc={previewDocument}
			/>
		</section>
	);
};
