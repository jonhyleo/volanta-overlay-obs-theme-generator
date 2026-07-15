import type { FlightSnapshot } from "../theme/types";

const planeSrc = `data:image/svg+xml,${encodeURIComponent(
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><path d="M57 30.7 35.8 23.9 26.4 5.7a2.2 2.2 0 0 0-4 0L20 24 7 20.1a1.8 1.8 0 0 0-2.2 2.4l5.8 9.5-5.8 9.5A1.8 1.8 0 0 0 7 43.9l13-3.9 2.5 18.3a2.2 2.2 0 0 0 4 0l9.4-18.2L57 33.3a1.4 1.4 0 0 0 0-2.6Z" fill="#ffffff"/></svg>`,
)}`;

export const buildPreviewDocument = (css: string, flight: FlightSnapshot) => `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Volanta Preview</title>
		<style>${css}</style>
	</head>
	<body>
		<div id="root">
			<div class="">
				<div class="main-el-wrapper">
					<header class="">
						<div class="1">
							<div class="">
								<ol class="">
									<li class="">
										<p class="">SPD:</p>
										<p class=""><span>${flight.speedKnots}</span><span>kts</span></p>
									</li>
									<li class="">
										<p class="">VSPD:</p>
										<p class=""><span>${flight.verticalSpeedFpm}</span><span>fpm</span></p>
									</li>
									<li class="">
										<p class="">HDG:</p>
										<p class=""><span>${flight.headingDegrees}</span><span>°</span></p>
									</li>
									<li class="">
										<p class="">ALT:</p>
										<p class=""><span>${flight.altitudeFeet}</span><span>ft</span></p>
									</li>
								</ol>
							</div>
						</div>
						<div class="2">
							<div class="">
								<p class="">DEP</p>
								<p class="">${flight.origin}</p>
							</div>
							<img src="${planeSrc}" class="" alt="Plane" />
							<div class="">
								<p class="">ARR</p>
								<p class="">${flight.destination}</p>
							</div>
						</div>
						<div class="3">
							<div class="">
								<ol class="">
									<li class="">
										<p class="">ATC:</p>
										<p class=""><span>${flight.atc}</span><span></span></p>
									</li>
									<li class="">
										<p class="">NW:</p>
										<p class=""><span>${flight.network}</span><span></span></p>
									</li>
									<li class="">
										<p class="">PHASE:</p>
										<p class=""><span>${flight.phase}</span><span></span></p>
									</li>
									<li class="">
										<p class="">ETA:</p>
										<p class=""><span>${flight.eta}</span></p>
									</li>
								</ol>
							</div>
						</div>
					</header>
					<div class="">
						<div class="" style="width: ${flight.progressPercent}%;"></div>
					</div>
				</div>
				<div class=""></div>
				<div class=""></div>
			</div>
		</div>
	</body>
</html>`;
