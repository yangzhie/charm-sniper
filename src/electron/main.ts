import { app, BrowserWindow, ipcMain, webContents } from "electron";
import path from "path";
import { isDev, getPreloadPath } from "./utils.js";
import {
	fetchInspectLinkFromSteam,
	fetchInspectDataFromAPI,
	fetchFromCSFloat,
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
	ipcMain.on("start-charm-polling", async (event, charmName) => {
		await fetchAndSendCharmData(charmName, mainWindow);

		if (pollInterval) clearInterval(pollInterval);

		// @ts-ignore
		// Poll every 20 seconds
		pollInterval = setInterval(() => {
			fetchAndSendCharmData(charmName, mainWindow);
		}, 20000);
	});
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
	} catch (error) {
		console.error("Polling error:", error);
	}
}
