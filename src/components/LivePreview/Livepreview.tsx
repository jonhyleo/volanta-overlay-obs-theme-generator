import { useEffect, useState, useRef } from "react";
import clsx from "clsx";

interface Props {
	previewDocument: string;
}

const Livepreview = ({ previewDocument }: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isSticky, setIsSticky] = useState(false);

	// Attach scroll listener in effect to avoid accessing refs during render
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleScroll = () => {
			const el = containerRef.current;
			if (el) {
				const { top } = el.getBoundingClientRect();
				setIsSticky(top <= 0);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<section
			ref={containerRef}
			className={clsx("space-y-6 rounded-[28px] border border-white/10 bg-slate-950/35 p-0 mb-8 backdrop-blur sticky top-0 z-10", isSticky && "border-t-0 rounded-t-none")}
		>
			<div className="flex items-end justify-between gap-4 mb-4">
				<div>
					<p className="font-manrope text-sm font-bold uppercase tracking-[0.24em] text-slate-400 p-5 pb-0 m-0">Live Preview</p>
				</div>
			</div>

			<iframe
				title="Volanta overlay live preview"
				className="w-full rounded-[22px] border border-white/0 bg-transparent select-none pointer-events-none"
				srcDoc={previewDocument}
			/>
		</section>
	);
};

export default Livepreview;
