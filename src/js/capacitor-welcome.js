import { SplashScreen } from "@capacitor/splash-screen";
import { CapacitorHttp } from "@capacitor/core";

async function getAliments() {
	try {
		const response = await CapacitorHttp.get({
			url: "http://10.0.0.250:3000/aliments",
		});
		return response.data;
	} catch (e) {
		console.error("ERROR: " + e);
	}
}

window.customElements.define(
	"capacitor-welcome",
	class extends HTMLElement {
		constructor() {
			super();

			SplashScreen.hide();

			const root = this.attachShadow({ mode: "open" });

			root.innerHTML = /*html*/ `
				<style>
					:host {
						font-family: -apple-system, BlinkMacSystemFont,
							"Segoe UI", Roboto, Helvetica, Arial, sans-serif,
							"Apple Color Emoji", "Segoe UI Emoji",
							"Segoe UI Symbol";
						display: block;
						width: 100%;
						height: 100%;
					}
					h1,
					h2,
					h3,
					h4,
					h5 {
						text-transform: uppercase;
					}
					.button {
						display: inline-block;
						padding: 10px;
						background-color: #73b5f6;
						color: #fff;
						font-size: 0.9em;
						border: 0;
						border-radius: 3px;
						text-decoration: none;
						cursor: pointer;
					}
					main {
						padding: 15px;
					}
					main hr {
						height: 1px;
						background-color: #eee;
						border: 0;
					}
					main h1 {
						font-size: 1.4em;
						text-transform: uppercase;
						letter-spacing: 1px;
					}
					main h2 {
						font-size: 1.1em;
					}
					main h3 {
						font-size: 0.9em;
					}
					main p {
						color: #333;
					}
					main pre {
						white-space: pre-line;
					}
				</style>
				<div>
					<capacitor-welcome-titlebar>
						<h1>ERPLibre REST</h1>
					</capacitor-welcome-titlebar>
					<main>
						<aliment-list></aliment-list>
					</main>
				</div>
			`;
		}
	}
);

window.customElements.define(
	"capacitor-welcome-titlebar",
	class extends HTMLElement {
		constructor() {
			super();
			const root = this.attachShadow({ mode: "open" });
			root.innerHTML = /*html*/ `
				<style>
					:host {
						position: relative;
						display: block;
						padding: 15px 15px 15px 15px;
						text-align: center;
						background-color: #73b5f6;
					}
					::slotted(h1) {
						margin: 0;
						font-family: -apple-system, BlinkMacSystemFont,
							"Segoe UI", Roboto, Helvetica, Arial, sans-serif,
							"Apple Color Emoji", "Segoe UI Emoji",
							"Segoe UI Symbol";
						font-size: 0.9em;
						font-weight: 600;
						color: #fff;
					}
				</style>
				<slot></slot>
			`;
		}
	}
);

window.customElements.define(
	"aliment-list",
	class extends HTMLElement {
		constructor() {
			super();
			const root = this.attachShadow({ mode: "open" });
			root.innerHTML = /*html*/ `
				<style>
					:host {
						font-family: -apple-system, BlinkMacSystemFont,
							"Segoe UI", Roboto, Helvetica, Arial, sans-serif,
							"Apple Color Emoji", "Segoe UI Emoji",
							"Segoe UI Symbol";
						display: block;
						width: 100%;
						height: 100%;
					}
					.aliment-list {
						padding: 0;
						list-style-type: none;
					}
					.aliment {
						text-color: black;
					}
					.aliment + .aliment {
						margin-top: 0.5em;
					}
				</style>
				<div>
					<h2>Aliments</h2>
					<div>
						<ul class="aliment-list"></ul>
					</div>
				</div>
			`;
		}

		connectedCallback() {
			const self = this;
			const alimentList = self.shadowRoot.querySelector(".aliment-list");
			getAliments().then((data) => {
				for (const aliment of data) {
					alimentList.innerHTML += /*html*/ `<li class="aliment" data-id="${aliment.id}">${aliment.id} : ${aliment.name}</li>`;
				}
			});
		}
	}
);
