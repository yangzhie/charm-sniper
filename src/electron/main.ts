import { app, BrowserWindow, ipcMain, webContents } from "electron";
import path from "path";
import { isDev, getPreloadPath } from "./utils.js";
import {
	fetchInspectLinkFromSteam,
	fetchInspectDataFromAPI,
	fetchFromCSFloat,
	fetchCollections,
} from "./fetch.js";

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

	// Send static collection + charm data to renderer (one-time)
	// Renderer requests the data
	ipcMain.handle("get-static-data", async () => {
		const data = await fetchCollections();
		return data;
	});
});
