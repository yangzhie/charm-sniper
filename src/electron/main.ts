import {
	app,
	BrowserWindow,
	ipcMain,
	webContents,
	Notification,
} from "electron";
import path from "path";
import { isDev, getPreloadPath } from "./utils.js";
import {
	fetchInspectLinkFromSteam,
	fetchInspectDataFromAPI,
	fetchCollections,
} from "./fetch.js";

let pollInterval: number | null = null;

app.on("ready", () => {
	const mainWindow = new BrowserWindow({
		title: "Charm Sniper",
		width: 1100,
		height: 700,
		autoHideMenuBar: true,
		webPreferences: {
			preload: getPreloadPath(),
			contextIsolation: true,
			nodeIntegration: false,
		},
	});

	if (isDev()) {
		mainWindow.loadURL("http://localhost:9999/");
	} else {
		// Load initial file inside mainWindow
		// path helps configure Windows' \
		mainWindow.loadFile(
			path.join(app.getAppPath() + "/dist-react/index.html")
		);
	}

	// --------- Static Collection Data ----------
	ipcMain.handle("get-static-data", async () => {
		const data = await fetchCollections();
		return data;
	});

	// ------------------------- Polling ------------------------------
	ipcMain.on("start-charm-polling", async (_event, charmName) => {
		await fetchAndSendCharmData(charmName, mainWindow);

		if (pollInterval) clearInterval(pollInterval);

		// @ts-ignore
		// Poll every 20 seconds
		pollInterval = setInterval(() => {
			fetchAndSendCharmData(charmName, mainWindow);
		}, 22000);
	});

	// --- Listen for notification requests from renderer ---
	ipcMain.on("notify", (_event, { title, body }) => {
		// @ts-ignore
		const notification = new Notification({
			title: title,
			body: body,
			silent: false,
		});

		notification.show();
	});

	// --------- Fetch charm data on CSFloat ----------
	// ipcMain.handle("csfloat-data", async (_event, charmName) => {
	// 	setInterval(async () => {
	// 		try {
	// 			const data = await fetchFromCSFloat(
	// 				50,
	// 				"most_recent",
	// 				null,
	// 				null,
	// 				null,
	// 				"buy_now",
	// 				charmName
	// 			);

	// 			mainWindow.webContents.send("csfloat-data-update", data);
	// 		} catch (err) {
	// 			console.error("CSFloat fetch error:", err);
	// 		}
	// 	}, 20000);
	// });
});

async function fetchAndSendCharmData(
	charmName: string,
	mainWindow: BrowserWindow
) {
	try {
		// Fetch data
		const arr = await fetchInspectLinkFromSteam(charmName);
		const data = await fetchInspectDataFromAPI(arr);

		// Send update to renderer
		mainWindow.webContents.send("charm-data-update", data);
		// @ts-ignore
		mainWindow.webContents.send("error", null);
	} catch (error) {
		console.error("Polling error:", error);

		// @ts-ignore
		mainWindow.webContents.send("error", { message: error.message });
	}
}
