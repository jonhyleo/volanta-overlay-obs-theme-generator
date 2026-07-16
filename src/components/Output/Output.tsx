import { Copy } from "lucide-react";

interface OutputProps {
	cssOutput: string;
	copyCss: () => void;
}

const Output = ({ cssOutput, copyCss }: OutputProps) => {
	return (
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
	);
};

export default Output;
