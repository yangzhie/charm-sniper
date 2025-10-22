import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
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

	// const limit = 10;
	// const sort = "most_recent";
	// const type = "buy_now";
	// const hash = "Charm | Lil' Ferno";

	// fetchFromCSFloat(limit, sort, undefined, undefined, null, type, hash);
	(async () => {
		const data = await fetchCollections();
		console.log("MISSING");
		console.log(data?.missingLinkArr);
		console.log("\n");
		console.log("SMALLARMS");
		console.log(data?.smallArmsArr);
		console.log("\n");
		console.log("MISSINGCOMM");
		console.log(data?.missingLinkCommunityArr);
		console.log("\n");
		console.log("DRBOOM");
		console.log(data?.drBoomArr);
		console.log("\n");
		console.log("COLLECTIONS");
		console.log(data?.collectionArr);
		console.log("\n");
	})();
});
