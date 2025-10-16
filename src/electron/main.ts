import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { fetchInspectLinkFromSteam, fetchInspectDataFromAPI } from "./fetch.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});

    if (isDev()) {
        mainWindow.loadURL('http://localhost:9999/')
    } else {
        // Load initial file inside mainWindow
        // path helps configure Windows' \
        mainWindow.loadFile(path.join(app.getAppPath() + "/dist-react/index.html"));
    }

    // const itemName = "Charm%20%7C%20Lil'%20Dumplin'";
    // const itemName = "Sticker%20%7C%20Queen%20Ava%20(Foil)";
    const itemName = "M4A4%20%7C%20In%20Living%20Color%20%28Minimal%20Wear%29";
    const pageCount = 1;


    async function temp() {
        const steamData = await fetchInspectLinkFromSteam(itemName, pageCount);
        // @ts-ignore
        fetchInspectDataFromAPI(steamData.inspectLink, steamData.type);
    }

    temp();
})