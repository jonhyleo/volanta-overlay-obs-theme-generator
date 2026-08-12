import React from "react";

const GradientBG: React.FC = () => {
	return (
		<div className="fixed inset-0 z-0 pointer-events-none">
			<div
				className="layer base min-h-screen"
				id="layerBase"
				style={{
					background: "linear-gradient(205deg, rgb(233, 234, 235) 0%, rgb(146, 165, 177) 13%, rgb(91, 135, 157) 36%, rgb(57, 76, 84) 60%, rgb(20, 23, 24) 80%, rgb(7, 7, 7) 100%)",
				}}
			></div>

			<div
				className="layer treatment min-h-screen absolute inset-0 z-1"
				id="layerTreatment"
				style={{
					backgroundImage: `repeating-linear-gradient(
            109deg,
            rgba(255, 255, 255, 0.13) 0px,
            rgba(255, 255, 255, 0.13) 3%,
            rgba(20, 23, 24, 0.48) 6%,
            rgba(20, 23, 24, 0.48) 11%,
            rgba(78, 150, 187, 0.34) 14%,
            transparent 18%,
            transparent 23%
          )`,
					filter: "blur(34px)",
					opacity: 0.48,
					WebkitMaskImage: "linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 55%, transparent 100%)",
					maskImage: "linear-gradient(rgb(0, 0, 0) 0px, rgb(0, 0, 0) 55%, transparent 100%)",
					inset: "-10% -14% 20%",
				}}
			></div>

			<div
				className="layer glow min-h-screen absolute inset-0 z-2"
				id="layerGlow"
				style={{
					background: "radial-gradient(at 61% 1%, rgba(255, 255, 255, 0.27), transparent 38%), radial-gradient(at 63% 32%, rgba(78, 150, 187, 0.22), transparent 42%)",
				}}
			></div>

			<div
				className="layer particles min-h-screen absolute inset-0 z-3"
				id="layerParticles"
				style={{
					background: [
						"radial-gradient(circle at 88% 10%, rgba(255, 255, 255, 0.26) 0px, transparent 2px)",
						"radial-gradient(circle at 7% 78%, rgba(215, 220, 224, 0.12) 0px, transparent 2px)",
						"radial-gradient(circle at 79% 21%, rgba(255, 255, 255, 0.35) 0px, transparent 2px)",
						"radial-gradient(circle at 56% 31%, rgba(215, 220, 224, 0.28) 0px, transparent 1px)",
						"radial-gradient(circle at 52% 50%, rgba(215, 220, 224, 0.15) 0px, transparent 3px)",
						"radial-gradient(circle at 37% 56%, rgba(215, 220, 224, 0.3) 0px, transparent 3px)",
						"radial-gradient(circle at 61% 43%, rgba(215, 220, 224, 0.28) 0px, transparent 3px)",
						"radial-gradient(circle at 55% 34%, rgba(255, 255, 255, 0.33) 0px, transparent 2px)",
						"radial-gradient(circle at 83% 40%, rgba(215, 220, 224, 0.4) 0px, transparent 1px)",
						"radial-gradient(circle at 52% 53%, rgba(255, 255, 255, 0.34) 0px, transparent 2px)",
						"radial-gradient(circle at 91% 51%, rgba(255, 255, 255, 0.34) 0px, transparent 1px)",
						"radial-gradient(circle at 77% 83%, rgba(215, 220, 224, 0.21) 0px, transparent 2px)",
						"radial-gradient(circle at 95% 33%, rgba(255, 255, 255, 0.12) 0px, transparent 3px)",
						"radial-gradient(circle at 26% 36%, rgba(215, 220, 224, 0.14) 0px, transparent 2px)",
						"radial-gradient(circle at 26% 32%, rgba(215, 220, 224, 0.11) 0px, transparent 3px)",
						"radial-gradient(circle at 67% 50%, rgba(215, 220, 224, 0.38) 0px, transparent 1px)",
						"radial-gradient(circle at 24% 69%, rgba(255, 255, 255, 0.13) 0px, transparent 3px)",
						"radial-gradient(circle at 54% 79%, rgba(215, 220, 224, 0.28) 0px, transparent 2px)",
						"radial-gradient(circle at 40% 71%, rgba(255, 255, 255, 0.25) 0px, transparent 3px)",
						"radial-gradient(circle at 65% 33%, rgba(215, 220, 224, 0.14) 0px, transparent 1px)",
					].join(", "),
					opacity: 1,
				}}
			></div>

			<div
				className="layer vignette min-h-screen absolute inset-0 z-4"
				id="layerVignette"
				style={{
					background: "radial-gradient(circle, transparent 25%, rgba(0, 0, 0, 0.19) 58%, rgba(0, 0, 0, 0.84) 100%), linear-gradient(transparent 45%, rgba(0, 0, 0, 0.78) 100%)",
				}}
			></div>

			<div className="layer noise min-h-screen absolute inset-0 z-5" id="layerNoise" style={{ opacity: 0.24 }}></div>
		</div>
	);
};

export default GradientBG;
