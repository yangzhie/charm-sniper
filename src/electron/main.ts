import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import {
	fetchInspectLinkFromSteam,
	fetchInspectDataFromAPI,
	fetchFromCSFloat,
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

	// const itemName = "Charm%20%7C%20Lil%27%20Ferno";
	// const pageCount = 10;

	// async function temp() {
	// 	const listingArray = await fetchInspectLinkFromSteam(
	// 		itemName,
	// 		pageCount
	// 	);

	// 	const arr = await fetchInspectDataFromAPI(listingArray);

	// 	console.log(arr);
	// }

	// setInterval(async () => {
	// 	temp();
	// }, 15000);

	const limit = 10;
	const sort = "most_recent";
	const type = "buy_now";
	const hash = "Charm | Lil' Ferno";

	fetchFromCSFloat(limit, sort, undefined, undefined, null, type, hash);
});
