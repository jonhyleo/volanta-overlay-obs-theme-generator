import type { OverlayTheme } from "./types";

const planeIcon = encodeURIComponent(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M57 30.7 35.8 23.9 26.4 5.7a2.2 2.2 0 0 0-4 0L20 24 7 20.1a1.8 1.8 0 0 0-2.2 2.4l5.8 9.5-5.8 9.5A1.8 1.8 0 0 0 7 43.9l13-3.9 2.5 18.3a2.2 2.2 0 0 0 4 0l9.4-18.2L57 33.3a1.4 1.4 0 0 0 0-2.6Z" fill="#ffffff"/></svg>`,
);

export const themeToCss = (theme: OverlayTheme) => {
	const { palette, appearance } = theme;

	return `@import url("https://fonts.googleapis.com/css2?family=Mulish:wght@200..1000&display=swap");

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	background-color: rgba(0, 0, 0, 0);
	font-family: "Mulish", sans-serif;
	margin: 0 auto;
	overflow: hidden;
	text-size-adjust: 100%;
	--theme: var();
	--primary: ${palette.primary};
	--secondary: ${palette.secondary};
	--tertiary: ${palette.tertiary};
	--black: ${palette.black};
	--white: ${palette.white};
	--overlay-margin: 1rem;
	--border-radius: ${appearance.borderRadius}px;
	--border-width: ${appearance.borderWidth}px;
	--header-height: ${appearance.headerHeight}px;
	--progress-height: ${appearance.progressHeight}px;
	--progress-radius: ${appearance.progressRadius}px;
	--skew-offset: ${appearance.skewOffset}px;
	--shadow-filter: drop-shadow(0px 4px ${appearance.shadowBlur}px rgba(0, 0, 0, ${appearance.shadowOpacity}));
	color: var(--white);
}

#root > div > div {
	filter: var(--shadow-filter);
}

header {
	border: var(--border-width) solid var(--secondary) !important;
	border-radius: var(--border-radius) !important;
	display: flex;
	height: var(--header-height);
	margin: var(--overlay-margin);
	overflow: hidden;
	position: relative;
	width: calc(100vw - calc(var(--overlay-margin) * 2));
}

header > div:nth-child(1) {
	background-color: var(--primary);
	flex: 2 1 0%;
}

header > div:nth-child(1) > div,
header > div:nth-child(3) > div {
	height: 100%;
	padding: 0 2rem;
	position: relative;
	z-index: 1;
}

header > div:nth-child(1) > div:first-child {
	padding-right: calc(60px + 1rem);
}

header > div:nth-child(2) {
	align-items: center;
	background-color: var(--secondary);
	display: flex;
	flex: 1 1 0%;
	gap: 0.9rem;
	justify-content: center;
	padding: 0 1rem;
	position: relative;
	z-index: 3;
}

header > div:nth-child(2)::before {
	background-color: var(--secondary);
	content: "";
	height: 100%;
	left: calc(var(--skew-offset) * -1);
	position: absolute;
	top: 0;
	transform: skew(-40deg);
	width: calc(100% + calc(var(--skew-offset) * 2));
	z-index: -1;
}

header > div:nth-child(2) > div {
	background-color: transparent;
	display: grid;
	gap: 1rem;
	grid-template-columns: 1fr 1fr;
	min-width: 72px;
	place-items: center;
	text-align: center;
}

header > div:nth-child(2) > div:first-child p:first-child,
header > div:nth-child(2) > div:last-child p:last-child {
	color: var(--primary);
	font-size: 0.75rem;
	font-weight: 800;
	letter-spacing: 0.25em;
	text-transform: uppercase;
}

header > div:nth-child(2) > div:first-child p:last-child,
header > div:nth-child(2) > div:last-child p:first-child {
	color: var(--white);
	font-size: clamp(1.1rem, 2vw, 2rem);
	font-weight: 900;
	letter-spacing: 0.18em;
	line-height: 1;
	text-transform: uppercase;
}

header > div:nth-child(2) img {
	content: url("data:image/svg+xml,${planeIcon}");
	filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.35));
	flex: 0 0 auto;
	height: 50px;
	object-fit: contain;
	transform: rotate(270deg);
	width: 50px;
}

header > div:nth-child(3) {
	background-color: var(--tertiary);
	flex: 2 1 0%;
}

header > div:nth-child(3) > div:first-child {
	padding-left: calc(60px + 1rem);
}

header + div {
	background-color: var(--secondary) !important;
	border-radius: var(--progress-radius) !important;
	height: var(--progress-height);
	margin: 0 var(--overlay-margin);
	overflow: hidden;
	width: calc(100vw - calc(var(--overlay-margin) * 2));
}


header + div > div {
	background-color: var(--primary) !important;
	border-radius: 0;
	height: 100%;
	width: 100%;
}

ol {
	align-items: center;
	display: flex;
	gap: 0.75rem;
	height: 100%;
	justify-content: space-between;
	list-style: none;
	width: 100%;
}

ol li {
	align-items: baseline;
	display: flex;
	gap: 0.1rem;
	min-width: 0;
	white-space: nowrap;
}

ol li p:first-child {
	color: var(--secondary);
	font-size: 0.78rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	margin-right: 0.45rem;
	text-transform: uppercase;
}

ol li p:last-child {
	color: var(--white);
	font-size: 0.92rem;
	font-weight: 800;
	letter-spacing: 0.03em;
}

ol li p:last-child span:last-child {
	font-size: 0.72rem;
	font-weight: 700;
	margin-left: 0.3rem;
	opacity: 0.9;
}

@media (max-width: 900px) {
	header {
		flex-direction: column;
		height: auto;
	}

	header > div:nth-child(1) > div:first-child,
	header > div:nth-child(3) > div:first-child,
	header > div:nth-child(1) > div,
	header > div:nth-child(3) > div {
		padding: 1rem 1.25rem;
	}

	header > div:nth-child(2) {
		padding: 1rem;
	}

	header > div:nth-child(2)::before {
		left: 0;
		transform: none;
		width: 100%;
	}

	ol {
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	header + div {
		margin-bottom: 0.5rem;
	}
}`;
};
