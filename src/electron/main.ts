import { app, BrowserWindow, ipcMain } from "electron";
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

	// ipcMain.handle("get-api-data", async (event, args) => {
	// 	const itemName = "Charm%20%7C%20Lil%27%20Ferno";
	// 	const pageCount = 10;

	// 	const listingArray = await fetchInspectLinkFromSteam();
	// 	const object = await fetchInspectDataFromAPI(listingArray);
	// 	return object;
	// });

	// Recieves data from renderer
	ipcMain.on("message", (event, args) => {
		console.log(args);
	});
});
