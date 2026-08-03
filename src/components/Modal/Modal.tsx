import React, { useEffect, useState } from "react";

export interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	content?: React.ReactNode;
	children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title = "Título del Modal", content, children }) => {
	const [shouldRender, setShouldRender] = useState(isOpen);

	useEffect(() => {
		let timeoutId: number;

		if (isOpen) {
			setShouldRender(true);
			window.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		} else {
			// Retraso para la animación de salida (un poco más corta que la entrada)
			timeoutId = window.setTimeout(() => {
				setShouldRender(false);
			}, 250); // Duración de la animación de salida
		}

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "unset";
			if (timeoutId) {
				window.clearTimeout(timeoutId);
			}
		};
	}, [isOpen]);

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			onClose();
		}
	};

	if (!shouldRender) return null;

	return (
		// 1. Backdrop (Fondo) - Animación de Opacidad (Fade)
		<div
			className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        bg-black/70 backdrop-blur-sm
        transition-opacity duration-300 ease-in-out
        ${isOpen ? "opacity-100" : "opacity-0"}
      `}
			onClick={onClose}
			aria-modal="true"
			role="dialog"
		>
			{/* 2. Tarjeta del Modal - Animación Custom 'Pop-In' */}
			<div
				className={`
          w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col

          /* Animación de ENTRADA */
          ${isOpen ? "animate-modal-pop-in" : ""}

          /* Animación de SALIDA (Simple transición para no complicar la lógica) */
          ${!isOpen ? "transition-all duration-250 ease-in opacity-0 scale-95 translate-y-2" : ""}
        `}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			>
				{/* --- HEADER --- */}
				<div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
					<h3 className="text-lg font-semibold text-slate-100 font-manrope">{title}</h3>
					<button onClick={onClose} type="button" className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg p-1.5 transition-colors" aria-label="Cerrar modal">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/* --- MAIN --- */}
				<div className="px-6 py-5 text-slate-300 font-general text-sm leading-relaxed overflow-y-auto max-h-[60vh]">
					{content ? typeof content === "string" ? <p>{content}</p> : content : children}
				</div>

				{/* --- FOOTER --- */}
				<div className="flex items-center justify-end px-6 py-4 border-t border-slate-800 bg-slate-950/50 gap-3">
					<button
						onClick={onClose}
						type="button"
						className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl transition-all shadow-sm"
					>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
